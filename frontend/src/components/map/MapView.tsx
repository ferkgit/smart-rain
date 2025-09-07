import React, { useEffect, useRef } from 'react';
import maplibregl, { Map, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export interface Lead {
  id: number;
  name: string;
  lat: number;
  lon: number;
  status: string;
  owner: string;
}

export interface RouteGeoJSON {
  type: 'Feature';
  geometry: {
    type: 'LineString';
    coordinates: [number, number][];
  };
  properties?: Record<string, unknown>;
}

interface Props {
  leads: Lead[];
  route: RouteGeoJSON | null;
}

const statusColors: Record<string, string> = {
  pending: '#ff7f0e',
  assigned: '#1f77b4',
  completed: '#2ca02c'
};

function colorForLead(lead: Lead): string {
  return statusColors[lead.status] || '#888';
}

export default function MapView({ leads, route }: Props) {
  const mapRef = useRef<Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current && !mapRef.current) {
      mapRef.current = new maplibregl.Map({
        container: containerRef.current,
        style: {
          version: 8,
          sources: {
            osm: {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '&copy; OpenStreetMap contributors'
            }
          },
          layers: [{ id: 'osm', type: 'raster', source: 'osm' }]
        },
        center: [0, 0],
        zoom: 2
      });
    }
    return () => {
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const markers: Marker[] = [];
    leads.forEach((lead) => {
      const marker = new maplibregl.Marker({ color: colorForLead(lead) })
        .setLngLat([lead.lon, lead.lat])
        .setPopup(new maplibregl.Popup().setText(`${lead.name} (${lead.owner})`))
        .addTo(map);
      markers.push(marker);
    });

    return () => {
      markers.forEach((m) => m.remove());
    };
  }, [leads]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (map.getSource('route')) {
      (map.getSource('route') as any).setData(
        route ?? { type: 'FeatureCollection', features: [] }
      );
    } else if (route) {
      map.addSource('route', { type: 'geojson', data: route });
      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        paint: { 'line-color': '#ff0000', 'line-width': 4 }
      });
    }
  }, [route]);

  return <div ref={containerRef} style={{ flex: 1, height: '100vh' }} />;
}
