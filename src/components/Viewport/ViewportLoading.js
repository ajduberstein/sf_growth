import React from 'react'

import SF from './sf'

let repeatTimer = null

const totalLines = SF.split('\n').length
const arr = SF.split('\n')

class ViewportLoading extends React.Component {
  constructor () {
    super()
    this.state = {
      numLines: 60
    }
  }

  componentDidMount () {
    repeatTimer = setInterval(() => {
      console.log('hey')
      console.log(this.state.numLines)
      this.setState({
        numLines: this.state.numLines <= totalLines ? this.state.numLines + 1 : 0
      })
    }, 100)
  }

  componentWillUnmount () {
    clearInterval(repeatTimer)
  }

  render () {
    return (
      <div style={{
        fontSize: 8,
        fontFamily: 'monospace',
        whiteSpace: 'pre',
        overflow: 'hidden'
      }}>
        { arr.slice(0, this.state.numLines).join('\n') }
      </div>
    )
  }
}

export {
  ViewportLoading
}
