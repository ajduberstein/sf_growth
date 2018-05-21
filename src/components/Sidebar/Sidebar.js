import React, { Component } from 'react'
import { Sidebar, Segment } from 'semantic-ui-react'

class SidebarLeftSlideAlong extends Component {
  render () {
    const { visible } = this.props
    return (
      <Sidebar.Pushable
        as={Segment}
      >
        <Sidebar as={Segment}
          animation='slide along'
          visible={visible}
          vertical
          style={style}>
          {this.props.children[0]}
        </Sidebar>
        <Sidebar.Pusher
        >
          {this.props.children[1]}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}

const style = {
  padding: '1em',
  width: '20%',
  background: '#984ea3',
  color: 'white',
  overflowWrap: 'break-word'
}

export default SidebarLeftSlideAlong
