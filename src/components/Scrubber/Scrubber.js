import React, {Component} from 'react'

import './Scrubber.css'

export default class Scrubber extends Component {
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
    let {marks, currentIdx} = this.props
    console.log(currentIdx)
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
                  return (<div pk={'markTitle' + i}>{x}</div>)
                } else {
                  return (<div pk={'markTitle' + i}>{}</div>)
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
                <div pk={i} onClick={this.onClick} className='mark'>
                  <div pk={i} className='leftBox' />
                  <div pk={i} className={'rightBox' + (currentIdx === i ? ' circle' : '')} />
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
