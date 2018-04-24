import React, {Component} from 'react';

import './Scrubber.css'

const LETTER_WIDTH_PX = 5;

const getMarkSize = () => {
  try {
    return document.getElementsByClassName('mark')[0].getBoundingClientRect().width;
  } catch(error) {
    return 20
  }
}

const getLargest = (marks) => {
  try {
    return Math.max(...marks.map(x => ('' + x).length))
  } catch(error) {
    return 1
  }
}

export default class Scrubber extends Component {

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
    let {marks, currentIdx} = this.props;
    let longestMark = getLargest(marks);
    if (!marks) return
    let gridRepeat = marks.length;
    // let scrubberWidthPx = marks.length * getMarkSize();
    // let scrubPct = currentIdx / marks.length;
    let delta = ((LETTER_WIDTH_PX * longestMark) / 2)
    let currentPlayheadLocation = delta + currentIdx * getMarkSize();
    return (
      <div className="scrubber">
        <div className='wrapper'>
          <div className="wrapper markTitleBox"
            style={
              {'gridTemplateColumns': `repeat(${gridRepeat}, 1fr`}
            }>
            {
              marks.map((x, i) => {
                if (i % 5 === 0) {
                  return (<div pk={"markTitle" + i}>{x}</div>)
                } else {
                  return (<div pk={"markTitle" + i}>{}</div>)
                }
              })
            }
          </div>

          <div className="wrapper scrubberBox"
            style={
              {'gridTemplateColumns': `repeat(${gridRepeat}, 1fr`}
           }>
           {
              marks.map((x, i) => (
                  <div pk={i} onClick={this.onClick} className='mark'>
                    <div pk={i} className='leftBox' />
                    <div pk={i} className='rightBox' />
                  </div>
                )
              )
            }
            <div className='playheadWrapper'>
              <div className='playhead'>
                <div className='circle'
                  style={
                    {'left': `${currentPlayheadLocation}px` }
                  } >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
