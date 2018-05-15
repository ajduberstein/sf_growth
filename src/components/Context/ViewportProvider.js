import React, { Component } from 'react'

import {LinearInterpolator, FlyToInterpolator} from 'react-map-gl';
import * as d3 from 'd3-ease';

const ViewportContext = React.createContext()
class ViewportProvider extends Component {
  state = {
    viewport: {
      longitude: -122.4428026,
      latitude: 37.7502022136,
      zoom: 11,
      maxZoom: 17,
      pitch: 0,
      bearing: 0,
      width: 500,
      height: 500,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator()
    },
    updated: false
  }

  _resize = () => {
    this.onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  componentDidMount = () => {
    window.addEventListener('resize', this._resize.bind(this))
    this._resize()
  }

  onViewportChange = (viewport) => {
    if (window.location.hash === '#viewport') {
      console.log(`(${viewport.latitude} ${viewport.longitude}`)
    }
    this.setState({
      viewport: {...this.state.viewport, ...viewport},
      updated: !this.state.updated
    })
  }

  render () {
    console.log(`Provider state: ${this.state.viewport.latitude}`)
    return (
      <ViewportContext.Provider value={{
        state: this.state,
        onViewportChange: this.onViewportChange,
        updated: this.state.updated
      }}>
        {this.props.children}
      </ViewportContext.Provider>
    )
  }
}

export {
  ViewportProvider,
  ViewportContext
}
