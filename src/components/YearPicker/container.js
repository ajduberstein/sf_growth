import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  bumpTime
} from '../../actions'

import Display from './display'

const MS_UNTIL_LONG_PRESS = 500
const MS_UNTIL_REFERSH = 100
let buttonPressTimer = null
let repeatTimer = null

class Container extends Component {
  handleButtonPress = (e) => {
    const shouldIncrement = this._getIncrement(e)
    this.props.handleBump(shouldIncrement)
    buttonPressTimer = setTimeout(
      () => this.handleLongPressBump(shouldIncrement),
      MS_UNTIL_LONG_PRESS)
  }

  handleLongPressBump = (e) => {
    repeatTimer = setInterval(() => {
      this.props.handleBump(e)
    }, MS_UNTIL_REFERSH)
  }

  _getIncrement = (e) => {
    const shouldIncrement = e.target.getAttribute('shouldincrement') === 'true'
    return shouldIncrement
  }

  handleButtonRelease = (e) => {
    clearTimeout(buttonPressTimer)
    clearInterval(repeatTimer)
  }

  componentWillUnmount () {
    clearTimeout(buttonPressTimer)
  }

  render () {
    const {
      tickTime
    } = this.props
    return (
      <Display
        year={tickTime}
        handleButtonPress={this.handleButtonPress}
        handleButtonRelease={this.handleButtonRelease}
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
    handleBump: (shouldIncrement) => {
      dispatch(bumpTime(shouldIncrement))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
