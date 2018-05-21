import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LineChartDisplay from './LineChartDisplay'

class LineChartContainer extends Component {
  render () {
    return (
      <LineChartDisplay
        {...this.props}
      />)
  }
}

LineChartContainer.propTypes = {
  aggregatedData: PropTypes.array.isRequired,
  yearPoint: PropTypes.any.isRequired
}

const mapStateToProps = (state) => {
  const {
    factData
  } = state.dataImports
  const {
    waypoints,
    activeWaypointIndex,
    tickTime
  } = state.uiInteraction
  const currentWaypointTitle = waypoints[activeWaypointIndex].title

  const aggregatedDictionary = factData.reduce(
    (aggregated, row, idx, fullArr) => {
      if (!aggregated.hasOwnProperty(row.start_date)) {
        aggregated[row.start_date] = 0
      }
      aggregated[row.start_date]++
      return aggregated
    }, {})

  let aggregatedData = []
  for (const [k, v] of Object.entries(aggregatedDictionary)) {
    aggregatedData.push({x: k, y: v})
  }

  return {
    yearPoint: [{x: tickTime, y: aggregatedDictionary[tickTime]}],
    aggregatedData
  }
}

export default connect(mapStateToProps)(LineChartContainer)

