import PropTypes from 'prop-types'

import React from 'react'
import '../../../node_modules/react-vis/dist/style.css'

import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  LineSeries,
  MarkSeries,
  HorizontalGridLines,
  Hint
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


export default class LineChartDisplay extends React.Component {
  render () {
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
          <LineSeries
            className='first-series'
            data={this.props.aggregatedData}
            opacity={1}
            curve='curveCatmullRom'
            strokeStyle='solid'
            color={'black'}
            curve={null}
          />
          <Hint value={{x: 2000, y: 10000}}
            orientation='topleft'
          >
          </Hint>
          <MarkSeries
            data={this.props.yearPoint}
          />
        </FlexibleWidthXYPlot>
      </div>
    )
  }
}

LineChartDisplay.propTypes = {
  aggregatedData: PropTypes.array.isRequired,
  yearPoint: PropTypes.object.isRequired
}
