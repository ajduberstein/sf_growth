import { Waypoint } from './models/waypoint'

export const waypoints = [
  new Waypoint({
    name: 'All SF',
    longitude: -122.3968194,
    latitude: 37.7576948,
    zoom: 12,
    maxZoom: 17,
    pitch: 0,
    bearing: 0
  }),
  new Waypoint({
    name: 'Hayes Valley',
    altitude: 1.5,
    bearing: -45.44,
    latitude: 37.77477549820658,
    longitude: -122.42524394426435,
    pitch: 39.33943049179117,
    zoom: 15.597433651836237
  }),
  new Waypoint({
    name: 'SoMA',
    altitude: 1.5,
    bearing: 15.840000000000002,
    latitude: 37.77313056098209,
    longitude: -122.40820442734362,
    pitch: 56.409046043693714,
    zoom: 14.417331696110463
  }),
  new Waypoint({
    name: 'Mission',
    altitude: 1.5,
    bearing: 3.952857142857148,
    latitude: 37.754001354031345,
    longitude: -122.42184705257911,
    pitch: 48.834855041393745,
    zoom: 14.930170151040052
  })]
