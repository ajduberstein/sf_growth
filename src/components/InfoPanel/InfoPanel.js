import React, {Component} from 'react';
import './InfoPanel.css';

import { md5 } from '../../lib/md5';


const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}


export default class InfoPanel extends Component {
  constructor (props) {
    super(props);
    this.state = {
      expanded: false,
    }
    this.onClick.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    try {
      return md5(this.props.data) !== md5(nextProps.data)
    } catch (err) {
      return true;
    }
  }

  _formatDictionary(dict) {
    let formattedKVList = []
    const keys = Object.keys(dict);
    let i = 0
    for (const key of keys) {
      let newKey = "" + key;
      if (key.indexOf('_') !== -1) {
        newKey = key.replace('_', ' ')
      }
      formattedKVList.push(
        <div key={i} className='row'>
          <span className='key'>{toTitleCase(newKey)}</span>
          <br />
          <span className='value'>{dict[key]}</span>
          <br />
          <br />
        </div>)
      i++
    }
    return formattedKVList
  }

  onClick(e) {
    // TODO make functional
    this.setState({expanded: !this.state.expanded})
  }
  
  render() {
    const { data, title, description} = this.props;

    if (!data) return (<div className='panel'>
      <div className='embed'>
        <h4> { title } </h4>
        <p> {description} </p>
        <p><em>Press to see more</em></p>
      </div>
    </div>)

   
    const val = this.state.expanded ? '300px' : '150px';
    return (
      <div className='panel'
       style={{maxWidth: val}}
      > 
        <div className='embed'>
        <h4> { title } </h4>
        { this._formatDictionary(data) }
        </div>
      </div>
    );
  }

}
