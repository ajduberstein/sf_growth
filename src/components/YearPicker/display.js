import React from 'react'

import './style.css'

const UNICODE_DOWN_ARROW = '\u25BC'
const UNICODE_UP_ARROW = '\u25B2'

const clicker = (shouldIncrement, props) => {
  const btnbody = shouldIncrement === 'true' ? UNICODE_UP_ARROW : UNICODE_DOWN_ARROW

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
