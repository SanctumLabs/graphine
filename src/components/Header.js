import React from 'react';
import logo from '../images/logo.svg';

const Header = () => {
    return(
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>D3 Scatterplot</h2>
        </div>
    )
};

export default Header

