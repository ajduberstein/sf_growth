import React, { Component } from 'react'

import MapGL from 'react-map-gl'
import { DeckGLOverlay } from '../DeckGLOverlay'

import { DataContext, ViewportContext } from '../Context'

const MAPBOX_TOKEN = 'pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoidGllX1gxUSJ9.gElUooDF7u51guCQREmAhg'; // eslint-disable-line

export default class Viewport extends Component {
  _renderWithContexts (viewportCtx, dataCtx) {
    if (!dataCtx.state.data) {
      return <React.Fragment> No data </React.Fragment>
    }
    return (
      <MapGL
        {...viewportCtx.state.viewport}
        onViewportChange={viewportCtx.onViewportChange.bind(this)}
        mapboxApiAccessToken={MAPBOX_TOKEN}>
        <DeckGLOverlay viewport={viewportCtx.state.viewport}
          data={dataCtx.state.data}
          extruded={true}
          radius={30}
        />
      </MapGL>
    )
  }

  render () {
    return (
      <ViewportContext.Consumer>
        {(viewportCtx) => (
          <DataContext.Consumer>
            {(dataCtx) => this._renderWithContexts(
              viewportCtx, dataCtx)}
          </DataContext.Consumer>
        )}
      </ViewportContext.Consumer>
    )
  }
}
