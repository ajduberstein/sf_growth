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
      <p>
        In many respects, Hayes Valley is the ideal gentrification case study.
        In what is by hundreds of articles, Yelp reviews, and real estate guides
        voted the hippest neighborhood in SF, its past is significantly more complex.
        Articles on the neighborhood used to spend time discussing its blight.
        The neighborhood is mostly ignored by the SF Chronicle archives until
        the late 1980s. Much of the change can be attributes to two factors:
      </p>

      <ol>
        <li>The Loma Prieta earthquake</li>
        <li>Aggressive lobbying</li>
      </ol>

      <h3> Loma Prieta </h3>
      Loma Prieta strikes in October 1989, severely damaging the double-decker highway
      that bisects the business district of SF and its residential housing projects.
      <a href='#1'>The current highway exit</a> and <a href="#2">the historic exit</a>
      are two.

      Shortly after Loma Prieta, the cheap rents of Hayes begin to attract artier small
      businesses. The Hayes Valley Neigbhorhood Association lobbies for the removal of
      the highway and transformation of Octavia Street into a tree lined boulevard.
      The project is projected to cost $100M, rather than $50M to simply repair the highway.

      It is difficult to say whether this decision was a net benefit for San Franciscans
      and Bay Area residents at large.
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
