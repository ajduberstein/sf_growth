import React, {Component} from 'react'

import './Scrubber.css'

export default class Scrubber extends Component {
  render () {
    let {marks, currentIdx} = this.props
    if (!marks) return
    let gridRepeat = marks.length
    return (
      <div className='scrubber'>
        <div className='wrapper'>
          <div className='wrapper markTitleBox'
            style={
              {'gridTemplateColumns': `repeat(${gridRepeat}, 1fr`}
            }>
            {
              marks.map((x, i) => {
                if (i % 5 === 0) {
                  return (<div key={'markTitle' + i}>{x}</div>)
                } else {
                  return (<div key={'markTitle' + i}>{}</div>)
                }
              })
            }
          </div>

          <div className='wrapper scrubberBox'
            style={
              {'gridTemplateColumns': `repeat(${gridRepeat}, 1fr`}
            }>
            {
              marks.map((x, i) => (
                <div key={i} marknum={i} onClick={this.onClick} className='mark'>
                  <div
                    marknum={i}
                    className={
                      'leftBox' + (i % 5 !== 0 ? ' ' : ' bigMark')} />
                  <div
                    marknum={i}
                    className={
                      'rightBox' + (currentIdx === i ? ' playhead' : '')} />
                </div>
              )
              )
            }
          </div>
        </div>
      </div>
    )
  }
}
