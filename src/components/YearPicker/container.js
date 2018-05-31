import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  bumpTime
} from '../../actions'

import Display from './Display'

class Container extends Component {
  render () {
    return (
      <Display
        year={this.props.tickTime}
        handleBump={this.props.handleBump}
      />)
  }
}

Container.propTypes = {
  tickTime: PropTypes.number.isRequired,
  handleBump: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const {
    tickTime
  } = state.uiInteraction
  return {
    tickTime
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleBump: (e) => {
      const shouldIncrement = e.target.getAttribute('shouldincrement') === 'true'
      dispatch(bumpTime(shouldIncrement))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
