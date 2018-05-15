import { csv as requestCsv } from 'd3-request'

import * as actions from './index'

const PUBLIC_URL = process.env.PUBLIC_URL || ''
export const DATA_URLS = [
  `${PUBLIC_URL}/data/business.csv`,
  `${PUBLIC_URL}/data/neighborhoods.geojson`
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
  }).then(data =>
    dispatch(actions.fetchDataSuccess(data[0], data[1]))
  ).catch(
    error => dispatch(actions.fetchDataFailure(error))
  )
}
