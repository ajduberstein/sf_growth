class Waypoint {

  constructor(id, latitude, longitude, order, name) {
    this.id = id
    this.latitude = latitude
    this.longitude = longitude
    this.order = order
    this.name = name
  }

  toString() {
    return `(${this.longitude} ${this.latitude} ${this.id})`
  }

}

export {
  Waypoint
}
