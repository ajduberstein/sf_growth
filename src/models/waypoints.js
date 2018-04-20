class Waypoint {

  constructor(id, latitude, longitude, order, name) {
    this.id = id
    this.latitude = latitude
    this.longitude = longitude
  }

  toString() {
    return `(${this.longitude} ${this.latitude} ${this.id})`
  }

}
