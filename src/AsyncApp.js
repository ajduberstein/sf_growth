import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { fetchData } from './actions/apiActions'
import { moveToSegment, pauseTimerAtYear } from './actions'
import { connect } from 'react-redux'

import { App, labelLookup } from './App'

class AsyncApp extends Component {
  componentDidMount () {
    this.props.fetchData()
  }

  //  tick() {
  //    const res = this.state.db.nextResultSet();
  //    if (res) {
  //      this.setState({
  //        data: res,
  //        currentYear: this.state.db.currTs,
  //      });
  //    }
  //  }

  render () {
    const {
      neighorhoodData,
      businessData,
      loading
    } = this.props
    if (!loading) {
      return (
        <App
          neighborhoodData={neighorhoodData}
          businessData={businessData}
          segment={this.props.segment}
        />
      )
    }
    return ('Loading...')
  }
}

AsyncApp.propTypes = {
  segment: PropTypes.number,
  neighorhoodData: PropTypes.object,
  businessData: PropTypes.array,
  loading: PropTypes.bool,
  fetchData: PropTypes.func.isRequired,
  handleScrubberClick: PropTypes.func.isRequired,
  handleStartClick: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const {
    neighorhoodData,
    businessData,
    loading
  } = state.dataImports
  const {
    segment
  } = state.uiInteraction

  return {
    segment,
    neighorhoodData,
    businessData,
    loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {
      dispatch(fetchData())
    },
    handleStartClick: () => {
      dispatch(moveToSegment(1))
    },
    handleScrubberClick: (e) => {
      // clearInterval(this.state.timer)
      // const year = "" + labels[idx];
      // const res = this.state.db.getResultSetAtTime(year)
      // this.setState({
      //   currentYear: year,
      //   data: res,
      //   timer: null,
      // })

      let selectedIdx = e.target.getAttribute('markNum') * 1
      e.preventDefault()
      dispatch(pauseTimerAtYear(labelLookup[selectedIdx]))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AsyncApp)
