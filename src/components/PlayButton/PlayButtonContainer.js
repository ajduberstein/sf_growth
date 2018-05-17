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
        handlePress={ timerIsActive ? playAction : pauseAction }
        shouldPlay={ timerIsActive }
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    timerIsActive: state.uiInteraction.timerIsActive
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
  playAction: PropTypes.func.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps)(PlayButtonContainer)
