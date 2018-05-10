import React, {Component} from 'react'

import './WaypointSelector.css'

export default class WaypointSelector extends Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick (e) {
    let selectedIdx = e.target.getAttribute('pk') * 1
    e.preventDefault()
    this.props.handleClick(selectedIdx)
  }

  render () {
    const {
      waypoints,
      selectedWaypointIdx
    } = this.props
    const waypointElements = waypoints.map((x, i) => {
      return (
        <li
          pk={i}
          className={(i === selectedWaypointIdx ? 'selected' : '')}
          onClick={this.onClick}
        > {x.name} </li>
      )
    })
    return (
      <ol>
        { waypointElements }
      </ol>
    )
  }
}
