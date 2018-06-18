import React from 'react'
import { Waypoint } from './models/waypoint'
import { makeObjectsFromList } from './models/common'

const HUGE_STRING = 'Lorem ipsum dolor amet aliqua succulents fugiat id lumbersexual tumblr poutine YOLO voluptate woke eiusmod photo booth banh mi. Migas DIY prism aute, offal actually scenester eiusmod ramps. Fingerstache ennui prism, pour-over four loko consectetur qui freegan hoodie officia blog eu everyday carry. Culpa asymmetrical elit sunt butcher aesthetic tumeric sint retro listicle art party ea et. Vegan elit taxidermy woke pitchfork vexillologist pabst ad.'

const waypoints = makeObjectsFromList([
  {
    title: 'SF over the last 50 years',
    longitude: -122.3968194,
    latitude: 37.7576948,
    zoom: 12,
    maxZoom: 17,
    pitch: 0,
    bearing: 0,
    content: HUGE_STRING
  },
  {
    title: 'Hayes Valley',
    altitude: 1.5,
    bearing: -45.44,
    latitude: 37.77477549820658,
    longitude: -122.42524394426435,
    pitch: 39.33943049179117,
    zoom: 15.597433651836237,
    content: (<React.Fragment>
      This is <a href='#1'>placeholder</a> text
    </React.Fragment>)
  },
  {
    title: 'SoMA',
    altitude: 1.5,
    bearing: 15.840000000000002,
    latitude: 37.77313056098209,
    longitude: -122.40820442734362,
    pitch: 56.409046043693714,
    zoom: 14.417331696110463,
    content: HUGE_STRING
  },
  {
    title: 'Mission',
    altitude: 1.5,
    bearing: 3.952857142857148,
    latitude: 37.754001354031345,
    longitude: -122.42184705257911,
    pitch: 48.834855041393745,
    zoom: 14.930170151040052,
    content: HUGE_STRING
  }], Waypoint)

export {
  waypoints
}
