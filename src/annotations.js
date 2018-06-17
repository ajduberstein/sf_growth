import { makeAnnotations } from './models/annotation'

const annotations = makeAnnotations([
  {
    id: 1,
    longitude: -122.4253213,
    latitude: 37.7765551,
    body: 'Historic highway exit'
  },
  {
    id: 2,
    longitude: -122.4266892,
    latitude: 37.7757434,
    body: 'Current highway exit'
  }
])

export {
  annotations
}
