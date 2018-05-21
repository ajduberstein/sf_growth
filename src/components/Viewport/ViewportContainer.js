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
  dimensionData: PropTypes.object.isRequired,
  factData: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  const {
    dimensionData,
    factData
  } = state.dataImports
  const {
    viewport
  } = state.viewportReducer
  const {
    tickTime,
    timeField
  } = state.uiInteraction

  const filtered = factData.filter(
    d => d[timeField] <= tickTime)

  if (filtered.length === 0) {
    throw new Error('No data received for fact data')
  }

  return {
    dimensionData: dimensionData,
    factData: filtered,
    viewport
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    moveViewport: (viewport) => {
      dispatch(moveViewport(viewport))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewportContainer)
