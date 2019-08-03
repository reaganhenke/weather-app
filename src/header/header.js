import React, { Component } from 'react';
import './header.css';

class Header extends Component {
  render(){
    return (
      <header>
        <h1><span>Weather App</span><span role="img" aria-label="umbrella">☂️</span></h1>
      </header>
    )
  }
}

export default Header;
