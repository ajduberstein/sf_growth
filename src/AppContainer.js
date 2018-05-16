import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { fetchData } from './actions/apiActions'
import { moveToSegment, startTimer } from './actions'
import { connect } from 'react-redux'

import { App } from './App'

class AppContainer extends Component {
  componentDidMount () {
    this.props.fetchData()
    this.props.startTimer()
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
      loading
    } = this.props
    if (loading === false) {
      return (
        <App
          segment={this.props.segment}
        />
      )
    }
    return ('Loading...')
  }
}

AppContainer.propTypes = {
  segment: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
  handleStartClick: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const {
    loading
  } = state.dataImports
  const {
    segment
  } = state.uiInteraction

  return {
    segment,
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
    startTimer: () => {
      dispatch(startTimer())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
