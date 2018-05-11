import React, {Component} from 'react'
import './Navbar.css'

export default class Navbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedLinkName: this.props.links[0]
    }
  }

  _onClick (e) {
    e.preventDefault()
    let text = e.target.innerText
    this.props.onClick(text)
    this.setState({selectedLinkName: text})
  }

  render () {
    let i = 0
    const links = this.props.links.map((link) => {
      i++
      let className = 'link'
      if (link === this.state.selectedLinkName) {
        className += ' selected'
      }
      return (
        <span key={i}
          onClick={this._onClick.bind(this)}
          className={className}>
          <a href=''>{link}</a>
        </span>
      )
    })
    return (
      <div className='navbar'
      >
        {links}
      </div>
    )
  }
}
