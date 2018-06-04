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

const aggregateArrayToTime = (factData, timeField) => {
  // Aggregates count of fact rows by time unit
  // returns an array of [{time unit, count}, ... ]
  return factData.reduce(
    (aggregated, row, idx, fullArr) => {
      if (!aggregated.hasOwnProperty(row[timeField])) {
        aggregated[row[timeField]] = 0
      }
      aggregated[row[timeField]]++
      return aggregated
    }, {})
}

const mapDictToXY = (aggregatedDictionary) => {
  // Aggregates fact data into a count of elements by year
  let linearSeries = []
  for (const [k, v] of Object.entries(aggregatedDictionary)) {
    linearSeries.push({x: k, y: v})
  }
  return linearSeries
}

const generateLinearAggregate = (factData, timeField, filterFunc = null) => {
  if (filterFunc) {
    factData = factData.filter(filterFunc)
  }
  const aggregatedDictionary = aggregateArrayToTime(factData, timeField)
  return mapDictToXY(aggregatedDictionary)
}

const generateSeries = (factData, timeField, filterFunc) => {
  return [
    {
      seriesId: 'main',
      color: HASH_COLORS.PURPLE,
      data: generateLinearAggregate(factData, timeField)
    },
    {
      seriesId: 'seconday',
      color: HASH_COLORS.ORANGE,
      data: generateLinearAggregate(factData, timeField, filterFunc)
    }
  ]
}

const mapStateToProps = (state) => {
  const {
    factData
  } = state.dataImports
  const {
    waypoints,
    activeWaypointIndex,
    tickTime,
    timeField,
    filterField
  } = state.uiInteraction
  const currentWaypointTitle = waypoints[activeWaypointIndex].title
  let linearSeries
  // Hack for neighborhood-specific charting
  if (activeWaypointIndex === 0) {
    linearSeries = [
      {
        seriesId: 'main',
        color: HASH_COLORS.PURPLE,
        data: generateLinearAggregate(factData, timeField)
      }
    ]
  } else {
    linearSeries = generateSeries(
      factData,
      timeField,
      x => x[filterField] === currentWaypointTitle
    )
  }
  return {
    yearPoint: [{x: tickTime, y: 0}, {x: tickTime, y: 15000}],
    linearSeries
  }
}

LineChartContainer.propTypes = {
  linearSeries: PropTypes.array.isRequired,
  yearPoint: PropTypes.any.isRequired
}

export default connect(mapStateToProps)(LineChartContainer)
