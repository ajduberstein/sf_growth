import React from 'react'

import './style.css'

const Display = (props) => {
  return (
    <div className='check-wrapper'>
      <input
        name="onlyActive"
        type="checkbox"
        checked={props.displayFilters.onlyActive}
        onClick={props.handleInputChange}
      />
      <label>Only current businesses</label>
      <br/>
      <input
        name="showBusinessType"
        type="checkbox"
        checked={props.displayFilters.showBusinessType}
        onClick={props.handleInputChange}
      />
      <label>Color by business category</label>
    </div>
  )
}

export default Display
