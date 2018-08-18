class Waypoint {
  constructor ({id, latitude, longitude, pitch, bearing, key, title, zoom, content, scrollToTime, scrollFromTime}) {
    this.id = id
    this.latitude = latitude
    this.longitude = longitude
    this.zoom = zoom
    this.pitch = pitch
    this.bearing = bearing
    this.key = key
    this.title = title
    this.content = content
    this.scrollFromTime = scrollFromTime
    this.scrollToTime = scrollToTime
  }

  toString () {
    return `(${this.longitude} ${this.latitude} ${this.id})`
  }

  toViewportAttrs () {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
      zoom: this.zoom,
      pitch: this.pitch,
      bearing: this.bearing
    }
  }
}

export {
  Waypoint
}
