import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { PlayButtonDisplay } from './PlayButtonDisplay'
import { connect } from 'react-redux'

import { startTimer, stopTimer } from '../../actions'

class PlayButtonContainer extends Component {
  render () {
    return (
      <PlayButtonDisplay 
        handlePress={this.props.playAction}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    year: state.year
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
