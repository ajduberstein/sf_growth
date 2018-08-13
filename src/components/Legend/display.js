import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.css'

export default class Legend extends Component {
  render () {
    const { elementsList } = this.props
    const marks = Object.keys(elementsList).map((k) => {
      return (<div className='mark'>
        <span className='mark-key' style={{
          color: elementsList[k]
        }}>{k}</span>
        <div className='circle mark-value' style={{
          background: elementsList[k]}} />
        <br/>
      </div>)
    })
    return (<div className='legend-box'>
      <span className='legend-title'>LEGEND</span>
      {marks}
    </div>)
  }
}

Legend.propTypes = {
  elementsList: PropTypes.any.isRequired
}
