import React, { Component } from 'react'

const ViewportContext = React.createContext()
class ViewportProvider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      viewport: {
        longitude: -122.4428026,
        latitude: 37.7502022136,
        zoom: 11,
        maxZoom: 17,
        pitch: 0,
        bearing: 0,
        width: 500,
        height: 500
      }
    }
    this._resize = this._resize.bind(this)
    this.onViewportChange = this.onViewportChange.bind(this)
  }

  _resize () {
    this.onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  componentDidMount () {
    window.addEventListener('resize', this._resize.bind(this))
    this._resize()
  }

  onViewportChange (viewport) {
    if (window.location.hash === '#viewport') {
      console.log('So you read source code, eh?')
      console.log(`(${viewport.latitude} ${viewport.longitude}`)
    }
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    })
  }

  render () {
    return (
      <ViewportContext.Provider value={{
        state: this.state,
        onViewportChange: this.onViewportChange
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
