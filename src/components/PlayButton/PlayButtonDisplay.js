import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

const PlayButtonDisplay = (props) => {
  return (
    <div className='playbutton'
      icon={!props.shouldPlay ? 'play' : 'pause'}
      onClick={props.handlePress}
    >
      {!props.shouldPlay ? 'Start >>' : 'Stop \u25A0'}
    </div>
  )
}

PlayButtonDisplay.propTypes = {
  handlePress: PropTypes.func.isRequired,
  shouldPlay: PropTypes.bool.isRequired
}

export {
  PlayButtonDisplay
}
