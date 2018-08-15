import React from 'react'
import PropTypes from 'prop-types'

import './selector.css'

const makeClicker = (direction, waypointIdx, onClick) => {
  return (
    <div className={direction}
      onClick={onClick} />)
}

const SelectorDisplay = (props) => {
  const {
    waypoint,
    onClick,
    numWaypoints,
    waypointIdx
  } = props

  const [isFirst, isLast] = [waypointIdx === 0, waypointIdx === numWaypoints - 1]
  const previousArrow = !isFirst ? makeClicker('arrow-left', waypointIdx, onClick) : ''
  const nextArrow = !isLast ? makeClicker('arrow-right', waypointIdx, onClick) : ''
  return (
    <React.Fragment>
      {previousArrow}
      <div className='body-wrapper'>
        <h3>{waypoint.title}</h3>
        <p>{waypoint.content}</p>
      </div>
      {nextArrow}
    </React.Fragment>
  )
}

SelectorDisplay.propTypes = {
  waypoint: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  numWaypoints: PropTypes.number.isRequired,
  waypointIdx: PropTypes.number.isRequired
}

export {
  SelectorDisplay
}
