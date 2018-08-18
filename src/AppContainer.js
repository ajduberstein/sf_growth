import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { fetchData } from './actions/apiActions'
import { startTimer } from './actions'
import { connect } from 'react-redux'

import { App } from './App'

class AppContainer extends Component {
  componentDidMount () {
    this.props.fetchData()
    this.props.startTimer()
  }

  render () {
    const {
      loading
    } = this.props
    if (loading === false) {
      return (
        <App />
      )
    }
    return ('Loading...')
  }
}

AppContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
  handleStartClick: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const {
    loading
  } = state.dataImports

  return {
    loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {
      dispatch(fetchData())
    },
    startTimer: () => {
      dispatch(startTimer())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
