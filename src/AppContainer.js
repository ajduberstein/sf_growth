import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { fetchData } from './actions/apiActions'
import { nextSegment, startTimer } from './actions'
import { connect } from 'react-redux'

import { App } from './App'

class AppContainer extends Component {
  componentWillMount () {
    this.props.fetchData()
  }

  componentDidMount () {
    this.props.startTimer()
  }

  render () {
    return (
      <App {...this.props}
      />
    )
  }
}

AppContainer.propTypes = {
  segment: PropTypes.number.isRequired,
  fetchData: PropTypes.func.isRequired,
  onClickStart: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const {
    segment
  } = state.uiInteraction
  const {
    loading
  } = state.dataImports

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
    onClickStart: () => {
      dispatch(nextSegment())
    },
    startTimer: () => {
      dispatch(startTimer())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
