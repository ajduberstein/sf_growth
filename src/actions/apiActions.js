import { csv as requestCsv } from 'd3-request'

import * as actions from './index'

const PUBLIC_URL = process.env.PUBLIC_URL || ''
const DATA_URL = `${PUBLIC_URL}/data/`
export const DATA_URLS = [
  `${DATA_URL}/business.csv`,
  `${DATA_URL}/neighborhoods.geojson`,
  `${DATA_URL}/neighborhood_characteristics.csv`,
  `${DATA_URL}/pct_growth.csv`
]

const fetchWithStructure = (url) => {
  if (url.endsWith('csv')) {
    return requestCsvPromise(url)
  } else if (url.endsWith('json')) {
    return requestJsonPromise(url)
  } else {
    throw new Error('Invalid file ending in fetch')
  }
}

const requestCsvPromise = (url) => {
  return new Promise((resolve, reject) => {
    requestCsv(url, (error, response) => {
      if (response && !error) {
        resolve(response)
      } else {
        reject(error)
      }
    })
  })
}

const requestJsonPromise = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url).then(resp => {
      return resp.json()
    }).then(
      data => resolve(data)).catch(
      err => console.error(err)
    )
  })
}

export const fetchData = () => dispatch => {
  let promises = DATA_URLS.map(x => fetchWithStructure(x))
  dispatch(actions.fetchDataBegin())
  Promise.all(promises).then(data => {
    return data
  }).then(data => {
    dispatch(actions.fetchDataSuccess(data[0], data[1], data[2], data[3]))
  }).catch(
    error => dispatch(actions.fetchDataFailure(error))
  )
}
