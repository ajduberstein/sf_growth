import {
  GeoJsonLayer,
  ScatterplotLayer,
  TextLayer
} from 'deck.gl'

import chroma from 'chroma-js'
import { COLORS } from './lib'

const getBusinessColor = (businessType) => {
  switch (businessType) {
    case 'Grocery':
      return COLORS.ALPHA_GREEN
    case 'Restaurant':
      return COLORS.ALPHA_PINK
    case 'Bar':
      return COLORS.ALPHA_BLUE
    case 'Laundry':
      return COLORS.ALPHA_RED
    default:
      return COLORS.TRANSPARENT
  }
}

const getAgeColor = (age) => {
  const scale = chroma.scale('viridis').classes([.7, .88, .9, 0.95, 1]);
  return scale(age)
}


const calculateFill = (d, currentTs, displayFilters) => {
  if (d.closed === '1' && displayFilters.onlyActive) {
    return COLORS.TRANSPARENT
  }
  if (d.start_date < currentTs) {
    if (displayFilters.showBusinessType) {
      return getBusinessColor(d.type)
    }
    return COLORS.ALPHA_PURPLE
  } else if (currentTs === d.start_date) {
    if (displayFilters.showBusinessType) {
      return getBusinessColor(d.type)
    }
    return COLORS.ALPHA_ORANGE
  } else {
    return COLORS.TRANSPARENT
  }
}

const getHeatmapLayer = (data, currentTs, displayFilters, displayFunc) => {
  currentTs = currentTs + ''
  return new ScatterplotLayer({
    id: 'heatmap',
    data,
    radiusScale: 5,
    opacity: 1,
    radiusMinPixels: 3,
    getPosition: (d) => {
      let z = currentTs - 1968
      if (!d.type || d.closed) {
        z = 0
      }
      return [+d.lng, +d.lat, z]
    },
    extruded: false,
    strokeWidth: 4,
    fp64: false,
    getPolygonOffset: ({layerIndex}) => [0, -layerIndex * 100],
    updateTriggers: {
      getColor: [currentTs, displayFilters]
    },
    getColor: d => calculateFill(d, currentTs, displayFilters)
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

const getGeojsonLayer = (data, displayFilters = []) => {
  return new GeoJsonLayer({
    id: 'geojson',
    data,
    getLineColor: f => {
      return [0, 0, 0]
    },
    getFillColor: f => {
      return getAgeColor(f.properties['% Under 20'])
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
  displayFilters,
  displayFunc
}) => {
  return [
    getGeojsonLayer(dimensionData, displayFilters),
    getHeatmapLayer(factData.data, tickTime, displayFilters, displayFunc),
    getTextLayer(annotations, tickTime, displayFilters.selectedNeighborhood)
  ]
}

export {
  makeLayers
}
