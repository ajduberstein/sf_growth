import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { LEGEND, TYPE_LEGEND } from '../../lib'

import Display from './display'

class Container extends Component {
  render () {
    const legend = this.props.showBusinessType ? TYPE_LEGEND : LEGEND
    return (
      <Display
        elementsList={legend}
      />)
  }
}

Container.propTypes = {
  elementsList: PropTypes.any.isRequired,
  displayFilters: PropTypes.any.isRequired
}

const mapStateToProps = (state) => {
  const {
    displayFilters
  } = state.uiInteraction
  let showBusinessType = displayFilters.showBusinessType
  return {
    showBusinessType
  }
}

export default connect(mapStateToProps)(Container)
