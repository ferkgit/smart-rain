class Vehicle {
  constructor({ id, capacity = 0, depotId }) {
    this.id = id;
    this.capacity = capacity;
    this.depotId = depotId;
  }
}
module.exports = Vehicle;
