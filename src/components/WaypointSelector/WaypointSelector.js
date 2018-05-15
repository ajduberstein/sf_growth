import React, {Component} from 'react'
import { connect } from 'react-redux'

import { Accordion } from 'semantic-ui-react'

import './WaypointSelector.css'

class WaypointSelector extends Component {
  state = { activeIndex: 0 }

  handleTitleClick = (e, itemProps) => {
    const { index } = itemProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({
      activeIndex: newIndex
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.activeIndex !== this.state.activeIndex &&
          this.state.activeIndex !== -1) {
      this.props.onViewportChange(
        this.props.waypoints[this.state.activeIndex].toViewportAttrs()
      )
    }
  }

  render () {
    const panels = this.props.waypoints.map((wp, i) => ({
      title: {
        content: <div> {wp.title} </div>,
        key: `title-${i}`
      },
      content: {
        content: <div> {wp.content} </div>,
        key: `content-${i}`
      }
    }))

    return (
      <Accordion
        activeIndex={this.state.activeIndex}
        panels={panels}
        onTitleClick={this.handleTitleClick} />
    )
  }
}

const mapStateToProps = (state) => {
  const {
    waypoints,
    activeWaypointIndex,
    onViewportChange
  } = state.uiInteraction

  return {
    waypoints,
    activeWaypointIndex,
    onViewportChange
  }
}

export default connect(mapStateToProps)(WaypointSelector)
