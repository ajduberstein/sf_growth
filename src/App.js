/* global window,document */
import React, { Component } from 'react'
import {
  Scrubber,
  Viewport
} from './components'

import { DataContext, DataProvider, ViewportProvider } from './components/Context'
import { Container, Header, Grid, Segment } from 'semantic-ui-react'
import 'mapbox-gl/dist/mapbox-gl.css'
import Responsive from 'react-responsive'

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={100} />;

let labelLookup = {}
let labels = Array(2017 - 1968).fill().map((_, i) => i + 1968)
labels.map((x, i) => { labelLookup[x] = i })

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      segment: 0
    }
    this.moveToSegment = this.moveToSegment.bind(this)
  }

  componentDidMount () {
    window.addEventListener('onkeydown', this.handleDown)
  }

  moveToSegment (idx) {
    this.setState({
      segment: idx
    })
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render () {
    return (
      <Default>
        <Container
          centered
          inverted
          textAlign='center'
          style={{ minHeight: '300px', padding: '1em 0em' }}
          vertical
        >
          <Header
            content={'A Half-Century of San Franciscan Growth'}
            textAlign='center'
            style={{ fontSize: '6rem', color: 'black', backgroundColor: 'white' }}
          />
        </Container>
        <DataProvider>
          <DataContext.Consumer>
            {(dataCtx) => (
              <Container centered>
                <Scrubber
                  marks={labels}
                  currentIdx={labelLookup[dataCtx.state.currentYear]}
                  handleClick={dataCtx.onScrubberClick}
                />
              </Container>
            )}
          </DataContext.Consumer>
          <ViewportProvider>
            <Viewport />
          </ViewportProvider>
        </DataProvider>
      </Default>
    )
  }

  componentDidCatch (error, info) {
    // Display fallback UI
    console.error(error)
  }
}
