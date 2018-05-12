import React from 'react'
import { DataContext } from '../Context'
import { VictoryChart, VictoryLine } from 'victory'

export default class LineChart extends React.Component {
  render () {
    return (
      <DataContext.Consumer>
        {(dataCtx) => {
          dataCtx.state.sql
          return (
            <VictoryChart>
              <VictoryLine
                samples={1}
                style={{data:
                  {stroke: 'red', strokeWidth: 4}
                }}
                y={
                  (data) => Math.sin(2 * Math.PI * data.x)
                }
              />
              <VictoryLine
                samples={10}
                style={{data:
                  {stroke: 'blue', strokeWidth: 4}
                }}
                y={(data) => Math.cos(2 * Math.PI * data.x)}
              />
            </VictoryChart>)
        }}
      </DataContext.Consumer>
    )
  }
}
