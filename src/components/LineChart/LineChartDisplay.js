import PropTypes from 'prop-types'

import React from 'react'
import '../../../node_modules/react-vis/dist/style.css'

import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  LineSeries,
  // MarkSeries,
  HorizontalGridLines
} from 'react-vis'

const yearTicks = (t, i) => {
  return (<tspan>
    <tspan x="0" dy="1em">{t}</tspan>
  </tspan>)
}

const numTicks = (t, i) => {
  let label = '' + t
  if (t / 1000 >= 1) {
    const numBeforeDecimal = (Math.floor(t / 1000) + '').length
    label = `${label.substr(0, numBeforeDecimal)}k`
  } else if (t / 1000000 > 1) {
    const numBeforeDecimal = (Math.floor(t / 1000000) + '').length
    label = `${label.substr(0, numBeforeDecimal)}M`
  }

  return (<tspan>
    <tspan x="0.5em" dy="0">{label}</tspan>
  </tspan>)
}

// const pctTicks = (t, i) => {
//   return (<tspan>
//     <tspan x="0" dy="1em">{label}</tspan>
//   </tspan>)
// }

const LineChartDisplay = (props) => {
  const lines = props.linearSeries.map(aggregatedData => {
    return (
      <LineSeries
        className='first-series'
        data={aggregatedData.data}
        opacity={1}
        curve='curveCatmullRom'
        strokeStyle='solid'
        color={aggregatedData.color}
        curve={null}
      />
    )
  })

  return (
    <div style={{margin: '10px', width: '90%'}}>
      <FlexibleWidthXYPlot
        height={200}
      >
        <HorizontalGridLines />
        <XAxis
          position='start'
          tickFormat={yearTicks}
        />
        <YAxis
          position='start'
          tickFormat={numTicks}
        />
        { lines }
        <LineSeries
          className='bar'
          data={props.yearPoint}
        />
      </FlexibleWidthXYPlot>
    </div>
  )
}

LineChartDisplay.propTypes = {
  linearSeries: PropTypes.array.isRequired,
  yearPoint: PropTypes.any.isRequired
}

export default LineChartDisplay
