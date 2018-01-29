import React, {Component} from 'react';

import './scrubber.css'

const LETTER_WIDTH_PX = 5;

const getMarkSize = () => {
  try {
  return document.getElementsByClassName('mark')[0].getBoundingClientRect().width;
  } catch(error) {
    return 20
  }
}

export default class Scrubber extends Component {

  constructor(props) {
    super(props)
    let marks = ['AAA', 'B', 'C', 'D', '4', 'A', 'B', 'C', 'D', '5']
    let longestMark = Math.max(...marks.map(x => x.length))
    this.state = {
      marks: marks,
      currentIdx: 0,
      longestMark: longestMark,
    }
  }


  render() {
    let {marks, longestMark, currentIdx} = this.state;
    let gridRepeat = marks.length;
    // let scrubberWidthPx = marks.length * getMarkSize();
    // let scrubPct = currentIdx / marks.length;
    let delta = ((LETTER_WIDTH_PX * longestMark) / 2)
    let currentPlayheadLocation = delta + currentIdx * getMarkSize();
    // 7.5, 27.5, 
    return (
      <div className="scrubber">
        <div className='wrapper'>
          <div className="wrapper markTitleBox"
            style={
              {'gridTemplateColumns': `repeat(${gridRepeat}, 1fr`}
            }>
            {
              this.state.marks.map((x, i) => {
                if (i % 2 == 0) {
                  return (<div>{x}</div>)
                } else {
                  return (<div>{}</div>)
                }
              })
            }
          </div>

          <div className="wrapper scrubberBox"
            style={
              {'gridTemplateColumns': `repeat(${gridRepeat}, 1fr`}
           }>
           {
              this.state.marks.map(
                x => (
                  <div className='mark'>
                    <div className='leftBox' />
                    <div className='rightBox' />
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
