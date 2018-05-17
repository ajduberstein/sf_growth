import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { clickScrubber, stopTimer } from '../../actions'

import ScrubberDisplay from './ScrubberDisplay'

import { labels, labelLookup } from '../../waypoints'

class ScrubberContainer extends Component {
  render () {
    return (
      <ScrubberDisplay
        {...this.props}
      />)
  }
}

ScrubberContainer.propTypes = {
  marks: PropTypes.array.isRequired,
  currentIdx: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const {
    year
  } = state.uiInteraction

  return {
    marks: labels,
    currentIdx: labelLookup[year]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (scrubberTickNum) => {
      dispatch(clickScrubber(scrubberTickNum))
      dispatch(stopTimer)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrubberContainer)
