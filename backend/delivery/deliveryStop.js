class DeliveryStop {
  constructor({ id, lat, lng, load = 0 }) {
    this.id = id;
    this.lat = lat;
    this.lng = lng;
    this.load = load;
  }
}
module.exports = DeliveryStop;
