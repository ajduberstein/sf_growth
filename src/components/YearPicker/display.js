import React from 'react'

import './style.css'

const clicker = (shouldIncrement, props) => {
  const btnbody = shouldIncrement === 'true' ? '▲' : '▼'
  return <div
    className='clickBtn'
    shouldincrement={shouldIncrement}
    onTouchStart={props.handleButtonPress}
    onTouchEnd={props.handleButtonRelease}
    onMouseDown={props.handleButtonPress}
    onMouseUp={props.handleButtonRelease}
    onMouseLeave={props.handleButtonRelease}
  >{btnbody}</div>
}

const Display = (props) => {
  return (
    <div className='picker-wrapper'>
      {clicker('true', props)}
      {props.year}
      {clicker('false', props)}
    </div>
  )
}

export default Display
