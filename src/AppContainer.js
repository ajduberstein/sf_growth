import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { fetchData } from './actions/apiActions'
import { moveToSegment } from './actions'
import { connect } from 'react-redux'

import { App } from './App'

class AppContainer extends Component {
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

AppContainer.propTypes = {
  segment: PropTypes.number,
  neighorhoodData: PropTypes.object,
  businessData: PropTypes.array,
  loading: PropTypes.bool,
  fetchData: PropTypes.func.isRequired,
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
