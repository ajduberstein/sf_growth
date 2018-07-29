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
      +d.lng,
      +d.lat
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

const getTextLayer = (annotations, currentTs, selectedNeighborhood) => {
  return new TextLayer({
    id: 'text-layer',
    getPosition: f => {
      return [f.longitude, f.latitude, 105]
    },
    getText: f => {
      if (selectedNeighborhood === f.neighborhood &&
        f.beginTs <= currentTs && f.endTs >= currentTs) {
        return f.body
      }
      return ''
    },
    getColor: f => {
      if (selectedNeighborhood === f.neighborhood &&
        f.beginTs <= currentTs && f.endTs >= currentTs) {
        return COLORS.BLACK
      }
      return COLORS.TRANSPARENT
    },
    data: annotations,
    updateTriggers: {
      getText: [currentTs, selectedNeighborhood],
      getColor: [currentTs, selectedNeighborhood]
    }
  })
}

const getGeojsonLayer = (data, selectedPolygonName = '') => {
  return new GeoJsonLayer({
    id: 'geojson',
    data,
    getLineColor: f => {
      return [0, 0, 0]
    },
    filled: false,
    extruded: false,
    lineWidthMinPixels: 1,
    stroked: true
  })
}

const makeLayers = ({
  dimensionData,
  factData,
  tickTime,
  timeField,
  annotations,
  annotationGroup,
  selectedNeighborhood
}) => {
  return [
    getGeojsonLayer(dimensionData, selectedNeighborhood),
    getHeatmapLayer(factData.data, tickTime),
    getTextLayer(annotations, tickTime, selectedNeighborhood)
  ]
}

export {
  makeLayers
}
