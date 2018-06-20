import {
  GeoJsonLayer,
  ScatterplotLayer,
  TextLayer
} from 'deck.gl'

import { COLORS } from './lib'

const calculateFill = (d, currentTs) => {
  if (d.start_date < currentTs) {
    return COLORS.ALPHA_PURPLE
  } else if (currentTs === d.start_date) {
    return COLORS.ALPHA_ORANGE
  } else {
    return COLORS.TRANSPARENT
  }
}

const getHeatmapLayer = (data, currentTs) => {
  currentTs = currentTs + ''
  return new ScatterplotLayer({
    id: 'heatmap',
    data,
    radiusScale: 5,
    opacity: 1,
    radiusMinPixels: 3,
    getPosition: (d) => [
      d.lng,
      d.lat
    ],
    extruded: false,
    strokeWidth: 4,
    fp64: false,
    isPickable: false,
    getPolygonOffset: ({layerIndex}) => [0, -layerIndex * 100],
    updateTriggers: {
      getColor: currentTs
    },
    getColor: d => calculateFill(d, currentTs),
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
  const visibleAnnotations = annotations.filter(
    x => x.annotationGroup === annotationGroup)
  let layers = [
    getGeojsonLayer(dimensionData),
    getHeatmapLayer(factData.data, tickTime)
  ]
  if (visibleAnnotations) {
    layers.push(getTextLayer(visibleAnnotations))
  }
  return layers
}

export {
  makeLayers
}
