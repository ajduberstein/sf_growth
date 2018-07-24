import { Annotation } from './models/annotation'
import { makeObjectsFromList } from './models/common'

const annotations = makeObjectsFromList([
  {
    longitude: -122.4253213,
    latitude: 37.7765551,
    beginTs: 1950,
    endTs: 1991,
    neighborhood: 'Hayes Valley',
    body: 'Historic highway exit'
  },
  {
    longitude: -122.4266892,
    latitude: 37.7757434,
    beginTs: 1991,
    endTs: 2017,
    neighborhood: 'Hayes Valley',
    body: 'Current highway exit'
  }
], Annotation)

export {
  annotations
}
