class Annotation {
  constructor ({id, latitude, longitude, body}) {
    this.id = id
    this.latitude = latitude
    this.longitude = longitude
    this.body = body
  }
}

const makeAnnotations = (dictList) => {
  return dictList.map(x => new Annotation(x))
}

export {
  makeAnnotations
}
