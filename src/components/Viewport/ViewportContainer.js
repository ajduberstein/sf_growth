import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { moveViewport } from '../../actions'

import { ViewportDisplay } from './ViewportDisplay'

class ViewportContainer extends Component {
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
    this.props.moveViewport(viewport)
  }

  render () {

    return (
      <ViewportDisplay
        {...this.props}
        onViewportChange={this.onViewportChange}
      />)
  }
}

ViewportContainer.propTypes = {
  viewport: PropTypes.object.isRequired,
  moveViewport: PropTypes.func.isRequired,
  neighborhoodData: PropTypes.object.isRequired,
  businessData: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  const {
    neighborhoodData,
    businessData
  } = state.dataImports
  const {
    viewport
  } = state.viewportReducer
  const {
    year
  } = state.uiInteraction

  const filteredToYear = businessData.filter(
    d => d.start_date <= year)

  return {
    neighborhoodData,
    businessData: filteredToYear,
    viewport
  }
}

//    let vp = {
//      ...this.state.viewport,
//    }
//    const selectedWaypoint = this.state.waypoints[selectedIdx];
//    vp['latitude'] = selectedWaypoint.latitude;
//    vp['longitude'] = selectedWaypoint.longitude;
//    vp['zoom'] = selectedWaypoint.zoom;
//    vp['pitch'] = selectedWaypoint.pitch;
//    vp['altitude'] = selectedWaypoint.altitude;
//    vp['bearing'] = selectedWaypoint.bearing;
//    vp['transitionDuration'] = 2000;
//    vp['transitionInterpolator'] = new FlyToInterpolator();
//    vp['transitionEasing'] = d3.easeCubic;
//
//
//    this.setState({
//      selectedWaypointIdx: selectedIdx,
//      viewport: vp,
//    });
//  };

const mapDispatchToProps = (dispatch) => {
  return {
    moveViewport: (viewport) => {
      dispatch(moveViewport(viewport))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewportContainer)
