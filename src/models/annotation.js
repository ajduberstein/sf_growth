class Annotation {
  constructor ({latitude, longitude, body, neighborhood, beginTs = 0, endTs = 99999}) {
    this.latitude = latitude
    this.longitude = longitude
    this.body = body
    this.beginTs = beginTs
    this.endTs = endTs
    this.neighborhood = neighborhood
  }
}

export {
  Annotation
}
