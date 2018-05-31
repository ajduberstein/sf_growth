import React from 'react'

import './style.css'

const clicker = (shouldIncrement, props) => {
  const btnbody = shouldIncrement === 'true' ? '▲' : '▼'
  return <div
    className='clickBtn'
    shouldincrement={shouldIncrement}
    onClick={props.handleBump}
  >{btnbody}</div>
}

const Display = (props) => {
  return (
    <div className='wrapper'>
      {clicker('true', props)}
      {props.year}
      {clicker('false', props)}
    </div>
  )
}

export default Display
