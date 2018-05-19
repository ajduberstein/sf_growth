import React from 'react'
import PropTypes from 'prop-types'

import { Accordion, Icon } from 'semantic-ui-react'

const AccordionFold = (waypoint, i, onClick, activeIdx) => {
  return (
    <React.Fragment>
      <Accordion.Title
        active={activeIdx === i}
          num={i}
          key={`li-${i}`}
          onClick={onClick}>
        <Icon name='dropdown' />
        {waypoint.title}
      </Accordion.Title>
      <Accordion.Content active={activeIdx === i}>
        <p>
          {waypoint.content}
        </p>
      </Accordion.Content>
    </React.Fragment>
  )
}

const SelectorDisplay = (props) => {
  const {
    activeWaypointIndex,
    waypoints,
    onClick
  } = props

  const folds = waypoints.map((wp, i) => {
    return AccordionFold(wp, i, onClick, activeWaypointIndex)
  })

  return (
    <Accordion styled>
      { folds }
    </Accordion>
  )
}

SelectorDisplay.propTypes = {
  waypoints: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  activeWaypointIndex: PropTypes.number.isRequired
}

export {
  SelectorDisplay
}
