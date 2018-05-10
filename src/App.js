/* global window,document */
import React, { Component } from 'react'
import {
  Header,
  Scrubber,
  Viewport,
  WaypointSelector
} from './components'


import { DataProvider, ViewportProvider } from './components/Context'
import { waypoints } from './waypoints'
import 'mapbox-gl/dist/mapbox-gl.css'


let labelLookup = {}
let labels = Array(2017 - 1968).fill().map((_, i) => i + 1968)
labels.map((x, i) => { labelLookup[x] = i })


export default class App extends Component {
  render () {
    return (
      <DataProvider>
        <ViewportProvider>
          <Viewport />
        </ViewportProvider>
      </DataProvider>
    )
     // const {
     //   data,
     //   currentYear,
     //   selectedWaypointIdx
     // } = ctx;
 
     // let year = (currentYear || '').substring(0, 4)
     // let scrubberIdx = labelLookup[year]
 
     // return (
     // <ctx.Consumer>
     //   <div className='parent'>
     //     <div className='child'>
     //       <div className='panel'>
     //         <WaypointSelector
     //           waypoints={waypoints}
     //           handleClick={ctx.onWaypointClick}
     //           selectedWaypointIdx={ctx.selectedWaypointIdx}
     //         />
     //       </div>
     //     </div>
     //     <div className='child--featured'>
     //       <div>
     //         <Header
     //           title={'A Half-Century of San Franciscan Growth'}
     //           subtitle={'Local businesses established since 1968'}
     //         />
     //         <Scrubber
     //           marks={labels}
     //           currentIdx={scrubberIdx}
     //           handleClick={ctx.onScrubberClick}
     //         />
     //       </div>
     //       {glViewer}
     //     </div>
     //   </div>
     // </ctx.Consumer>
    // )
  }

  componentDidCatch (error, info) {
    // Display fallback UI
    console.error(error)
  }
}
