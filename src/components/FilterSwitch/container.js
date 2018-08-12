import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  filterDataBy
} from '../../actions'

import Display from './display'

class Container extends Component {
  render () {
    return (
      <Display
        displayFilters={this.props.displayFilters}
        handleInputChange={this.props.handleInputChange}
      />)
  }
}

Container.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  displayFilters: PropTypes.any.isRequired
}

const mapStateToProps = (state) => {
  const {
    displayFilters
  } = state.uiInteraction
  return {
    displayFilters
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange (event) {
      const target = event.target
      const filter = {}
      const value = target.type === 'checkbox' ? target.checked : null
      filter[target.name] = value
      dispatch(filterDataBy(filter))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
