import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { PlayButtonDisplay } from './PlayButtonDisplay'
import { connect } from 'react-redux'

import { startTimer, stopTimer } from '../../actions'

class PlayButtonContainer extends Component {
  render () {
    const {
      timerIsActive,
      playAction,
      pauseAction
    } = this.props
    return (
      <PlayButtonDisplay
        handlePress={ timerIsActive ? pauseAction : playAction }
        shouldPlay={ timerIsActive }
      />
    )
  }
}

const mapStateToProps = (state) => {
  let {
    timerIsActive
  } = state.uiInteraction
  return {
    timerIsActive: timerIsActive
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    playAction: () => {
      dispatch(startTimer())
    },
    pauseAction: () => {
      dispatch(stopTimer())
    }
  }
}

PlayButtonContainer.propTypes = {
  playAction: PropTypes.func.isRequired,
  pauseAction: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayButtonContainer)
