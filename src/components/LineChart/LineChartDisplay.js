import PropTypes from 'prop-types'

import React from 'react';
import '../../../node_modules/react-vis/dist/style.css';

import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  MarkSeries
} from 'react-vis';


const tickFormatter = (t, i) => {
  return (<tspan>
    <tspan  x="0" dy="1em">{t}</tspan>
  </tspan>);
}

export default class LineChartDisplay extends React.Component {

  render() {
    return (
      <div style={{margin: '10px', width: '90%'}}>
        <FlexibleWidthXYPlot
          height={100}
          >
          <XAxis
            position='start'
            tickFormat={tickFormatter}
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
          <MarkSeries
            data={this.props.yearPoint}
          />
        </FlexibleWidthXYPlot>
      </div>
    );
  }
}

LineChartDisplay.propTypes = {
  aggregatedData: PropTypes.array.isRequired,
  yearPoint: PropTypes.object.isRequired
}
