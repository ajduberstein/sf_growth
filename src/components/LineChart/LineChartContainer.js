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
  yearPoint: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  const {
    businessData
  } = state.dataImports
  const {
    waypoints,
    activeWaypointIndex,
    year
  } = state.uiInteraction
  const currentNeighborhood = waypoints[activeWaypointIndex].title

  const aggregatedDictionary = businessData.reduce(
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
    yearPoint: [{x: year, y: aggregatedDictionary[year]}],
    aggregatedData
  }
}

export default connect(mapStateToProps)(LineChartContainer)

