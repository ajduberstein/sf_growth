import React from 'react'
import PropTypes from 'prop-types'

import {
  Header
} from 'semantic-ui-react'

const SeriesPickerDisplay = (props) => {
  return (
    <Header size='small' style={{
      background: '#FFD400'
    }}>{props.selectedDataSet}</Header>
  )
}

SeriesPickerDisplay.propTypes = {
  dataSetNames: PropTypes.array.isRequired,
  selectedDataSet: PropTypes.num.isRequired,
  onSelect: PropTypes.func.isRequired
}
