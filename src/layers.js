import {
  GeoJsonLayer,
  ScatterplotLayer,
  TextLayer
} from 'deck.gl'

import { COLORS } from './lib'

const getHeatmapLayer = (data, onClick = null) => {
  return new ScatterplotLayer({
    id: 'heatmap',
    data,
    radiusScale: 3,
    opacity: 1,
    radiusMinPixels: 3,
    getPosition: (d) => [
      d.lng,
      d.lat
    ],
    extruded: false,
    strokeWidth: 4,
    isPickable: false,
    getColor: (d) => {
      return [...COLORS.PURPLE, 140]
    },
    pickable: false
  })
}

const getTextLayer = (annotations) => {
  return new TextLayer({
    id: 'text-layer',
    getPosition: f => {
      return [f.longitude, f.latitude, 20]
    },
    getText: f => f.body,
    data: annotations
  })
}

const getGeojsonLayer = (data) => {
  const layer = new GeoJsonLayer({
    id: 'geojson',
    data,
    getLineColor: f => [0, 0, 0],
    filled: false,
    extruded: false,
    lineWidthMinPixels: 1,
    stroked: true
  })
  return layer
}

const makeLayers = ({
  dimensionData,
  factData,
  tickTime,
  timeField,
  annotations,
  annotationGroup
}) => {
  const filtered = factData.getFromMinToVal(tickTime)
  const visibleAnnotations = annotations.filter(
    x => x.annotationGroup === annotationGroup)
  let layers = [
    getGeojsonLayer(dimensionData),
    getHeatmapLayer(filtered)
  ]
  if (visibleAnnotations) {
    layers.push(getTextLayer(visibleAnnotations))
  }
  return layers
}

export {
  makeLayers
}
