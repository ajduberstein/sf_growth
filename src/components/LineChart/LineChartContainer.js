import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LineChartDisplay from './LineChartDisplay'

import { HASH_COLORS } from '../../lib/colors'

class LineChartContainer extends Component {
  render () {
    return (
      <LineChartDisplay
        {...this.props}
      />)
  }
}

const generateChangeSeries = (data, filterField, filterTo, valueField, timeField) => {
  const filteredData = data.filter(x => x[filterField] === filterTo)
  const mappedData = filteredData.map(d => {
    const x = d[timeField]
    const y = d[valueField]
    return {x, y}
  })

  return {
    seriesId: filterTo,
    color: filterTo === 'All SF' ? HASH_COLORS.PURPLE : HASH_COLORS.ORANGE,
    data: mappedData
  }
}

const mapStateToProps = (state) => {
  const {
    changeData
  } = state.dataImports
  const {
    waypoints,
    activeWaypointIndex,
    tickTime,
    filterField
  } = state.uiInteraction
  const currentWaypointTitle = waypoints[activeWaypointIndex].title
  let linearSeries
  // Hack for neighborhood-specific charting
  if (activeWaypointIndex === 0) {
    linearSeries = [
      generateChangeSeries(changeData, filterField, 'All SF', 'freq', 'start_date')
    ]
  } else {
    linearSeries = [
      generateChangeSeries(changeData, filterField, currentWaypointTitle, 'freq', 'start_date'),
      generateChangeSeries(changeData, filterField, 'All SF', 'freq', 'start_date')
    ]
  }
  let scrollHeight = Math.max(...linearSeries[0].data.map(d => d.y))

  return {
    yearPoint: [{x: tickTime, y: 0}, {x: tickTime, y: scrollHeight}],
    linearSeries
  }
}

LineChartContainer.propTypes = {
  linearSeries: PropTypes.array.isRequired,
  yearPoint: PropTypes.any.isRequired
}

export default connect(mapStateToProps)(LineChartContainer)
