const DeliveryStop = require('./deliveryStop');
const Vehicle = require('./vehicle');

function haversine(a, b) {
  const toRad = deg => (deg * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function groupStopsByDepot(stops, depots) {
  const groups = {};
  for (const depot of depots) groups[depot.id] = [];
  for (const stop of stops) {
    let nearest = depots[0];
    let minDist = haversine(stop, depots[0]);
    for (const depot of depots.slice(1)) {
      const d = haversine(stop, depot);
      if (d < minDist) {
        minDist = d;
        nearest = depot;
      }
    }
    groups[nearest.id].push(stop);
  }
  return groups;
}

function assignStopsToVehicles(depotGroups, vehicles) {
  const assignments = {};
  for (const v of vehicles) {
    assignments[v.id] = { vehicle: v, stops: [], load: 0 };
  }
  for (const depotId of Object.keys(depotGroups)) {
    const depotStops = [...depotGroups[depotId]];
    const depotVehicles = vehicles.filter(v => v.depotId === depotId);
    let idx = 0;
    for (const stop of depotStops) {
      let assigned = false;
      for (let i = 0; i < depotVehicles.length; i++) {
        const veh = depotVehicles[(idx + i) % depotVehicles.length];
        const record = assignments[veh.id];
        if (record.load + (stop.load || 0) <= veh.capacity) {
          record.stops.push(stop);
          record.load += stop.load || 0;
          assigned = true;
          idx++;
          break;
        }
      }
      if (!assigned) throw new Error('No vehicle capacity for stop ' + stop.id);
    }
  }
  return assignments;
}

function nearestNeighborRoute(depot, stops) {
  const unvisited = [...stops];
  const route = [depot];
  let current = depot;
  while (unvisited.length) {
    let nearestIdx = 0;
    let nearestDist = haversine(current, unvisited[0]);
    for (let i = 1; i < unvisited.length; i++) {
      const d = haversine(current, unvisited[i]);
      if (d < nearestDist) {
        nearestDist = d;
        nearestIdx = i;
      }
    }
    current = unvisited.splice(nearestIdx, 1)[0];
    route.push(current);
  }
  route.push(depot); // return
  return route;
}

function twoOpt(route) {
  let improved = true;
  while (improved) {
    improved = false;
    for (let i = 1; i < route.length - 2; i++) {
      for (let k = i + 1; k < route.length - 1; k++) {
        const a = route[i - 1];
        const b = route[i];
        const c = route[k];
        const d = route[k + 1];
        const current = haversine(a, b) + haversine(c, d);
        const swapped = haversine(a, c) + haversine(b, d);
        if (swapped + 1e-9 < current) {
          const reversed = route.slice(i, k + 1).reverse();
          route.splice(i, k - i + 1, ...reversed);
          improved = true;
        }
      }
    }
  }
  return route;
}

function routeDistance(route) {
  let dist = 0;
  for (let i = 0; i < route.length - 1; i++) {
    dist += haversine(route[i], route[i + 1]);
  }
  return dist;
}

function optimizeRoutes({ depots, vehicles, stops }) {
  const depotGroups = groupStopsByDepot(stops, depots);
  const assignments = assignStopsToVehicles(depotGroups, vehicles);
  const summaries = [];
  for (const { vehicle, stops, load } of Object.values(assignments)) {
    const depot = depots.find(d => d.id === vehicle.depotId);
    let route = nearestNeighborRoute(depot, stops);
    route = twoOpt(route);
    const distance = routeDistance(route);
    const etaHours = distance / 40; // 40km/h
    summaries.push({
      vehicleId: vehicle.id,
      distance,
      etaHours,
      load,
      capacity: vehicle.capacity,
      stops: route.slice(1, -1).map(s => s.id)
    });
  }
  return summaries;
}

module.exports = { optimizeRoutes };
