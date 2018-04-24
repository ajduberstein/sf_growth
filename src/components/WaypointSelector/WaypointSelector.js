import React, {Component} from 'react';

import './WaypointSelector.css'


export default class WaypointSelector extends Component {

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    let selectedIdx = e.target.getAttribute('pk') * 1;
    e.preventDefault();
    this.props.handleClick(selectedIdx);
  }

  render() {
    const {
      waypoints,
      selectedWaypointIdx,
    } = this.props;
    const waypointElements = waypoints.map((x, i) => {
      return (
        <div 
         pk={i}
         className={i === selectedWaypointIdx ? 'selected' : ''}
         onClick={this.onClick}
         > {x.name} </div>
      );
    })
    return (
      <div className='panel2 x-70'>
        { waypointElements }
      </div>
    );
  }

}

