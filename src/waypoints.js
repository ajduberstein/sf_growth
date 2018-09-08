/* eslint quotes: ["error", "single", { "allowTemplateLiterals": true }] */
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
    scrollFromTime: 1968,
    scrollToTime: 2018,
    content: `In my research, it is customary when discussing California to quote Joan Didion.
     "All that is constant about the California of my childhood is the rate at which it disappears,"
     she wrote in 1967. In a city where the most common overhead conversations concern a company's growth,
     and unlocking another level of potential either personal or corporate,
     it is perhaps not surprising that these individual actions have created a Bay Area unrecognizable
     to those who have lived here their entire lives, for better and worse.`
  },
  {
    title: 'Hayes Valley: A textbook case of gentrification',
    altitude: 1.5,
    bearing: -45.44,
    latitude: 37.77477549820658,
    longitude: -122.42524394426435,
    pitch: 39.33943049179117,
    zoom: 15.597433651836237,
    scrollFromTime: 2018,
    scrollToTime: 2018,
    content: `Hayes Valley in 2018 is one of the expensive neighborhoods in SF. It has something of a hidden history.`
  },
  {
    title: 'Hayes Valley: A textbook case of gentrification',
    altitude: 1.5,
    bearing: -45.44,
    latitude: 37.77477549820658,
    longitude: -122.42524394426435,
    pitch: 39.33943049179117,
    zoom: 15.597433651836237,
    scrollFromTime: 1968,
    scrollToTime: 1968,
    content: `Hayes Valley before 1989 receives few mentions by the SF Chronicle, but after its gentrification
     the paper retroactively refers to the area as "blighted."`
  },
  {
    title: 'Hayes Valley\u2063',
    altitude: 1.5,
    bearing: -45.44,
    latitude: 37.77477549820658,
    longitude: -122.42524394426435,
    pitch: 39.33943049179117,
    zoom: 15.597433651836237,
    scrollFromTime: 1968,
    scrollToTime: 1968,
    content: (<React.Fragment>
      The <a href="https://en.wikipedia.org/wiki/1989_Loma_Prieta_earthquake">1989 Loma Prieta earthquake</a> changes
      this, but not without aggressive lobbying from local homeowners.
    </React.Fragment>)
  },
  {
    title: 'Hayes Valley',
    altitude: 1.5,
    bearing: -45.44,
    latitude: 37.77477549820658,
    longitude: -122.42524394426435,
    pitch: 39.33943049179117,
    zoom: 15.597433651836237,
    scrollFromTime: 1988,
    scrollToTime: 2004,
    content: (<React.Fragment>
      The earthquake damaged 12,000 homes and 2,600 businesses in San Francisco, according to the USGS.
      In Hayes, it brought down a segment of the Central Freeway, a main artery from South Bay.
      It was projected to cost $50M to replace the highway, or $100M to remove the highway and design a new street
      to run beneath it.
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
    content: HUGE_STRING,
    scrollFromTime: 1987,
    scrollToTime: 1989
  },
  {
    title: 'Mission',
    altitude: 1.5,
    bearing: 3.952857142857148,
    latitude: 37.754001354031345,
    longitude: -122.42184705257911,
    pitch: 48.834855041393745,
    zoom: 14.930170151040052,
    content: HUGE_STRING,
    scrollFromTime: 1987,
    scrollToTime: 1989
  }], Waypoint)

export {
  waypoints
}
