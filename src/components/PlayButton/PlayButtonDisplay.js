import React from 'react'
import { Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const PlayButtonDisplay = (props) => {
  return (
    <Button.Group>
      <Button 
        icon={props.shouldPlay ? 'play' : 'pause'}
        content={props.shouldPlay ? 'Start' : 'Stop'}
        onClick={props.handlePress}
        />
    </Button.Group>
  )
}

PlayButtonDisplay.propTypes = {
  handlePress: PropTypes.func.isRequired,
  shouldPlay: PropTypes.bool.isRequired
}

export {
  PlayButtonDisplay
}
