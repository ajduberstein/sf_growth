import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

import { COLORS } from '../../lib'


class SidebarLeftSlideAlong extends Component {
  render() {
    const { visible } = this.props
    return (
      <Sidebar.Pushable 
        as={Segment}
        >
        <Sidebar as={Segment}
          animation='slide along'
          visible={visible}
          vertical
          style={{
            padding: '1em',
            width: '20%',
            background: '#984ea3',
            color: 'white',
            overflowWrap: 'break-word'
          }}>
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

export default SidebarLeftSlideAlong

