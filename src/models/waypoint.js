class Waypoint {

  constructor({id, latitude, longitude, pitch, bearing, order, name, zoom}) {
    this.id = id
    this.latitude = latitude
    this.longitude = longitude
    this.zoom = zoom
    this.pitch = pitch
    this.bearing = bearing
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
