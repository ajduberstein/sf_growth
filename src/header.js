import React, {Component} from 'react';
import './header.css';


export default class Header extends Component {
  _addDecor(arrLen) {
    const arr = ['red', 'yellow', 'green']
    let output = [];
    for (let i = 0; i < arrLen; i++) {
      output.push(
        <div key={i} className={"box " + arr[i % arr.length]}></div>
      )
    }
    return output
  }

  render() {
    const { title, subtitle} = this.props;
    return (
      <div className='header'>
        <div className='boxWrapper'>
          { this._addDecor(5) }
        </div>
        <span className='titleText'>{title}</span>
        <span className='subtitle'>{subtitle}</span>
        {this.props.subcomponent}
      </div>
    );
  }

}

