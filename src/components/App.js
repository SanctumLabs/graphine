import React, { Component } from 'react';
import Header from './Header';
import Chart from './chart';


class App extends Component {
  //noinspection JSMethodCanBeStatic
    render() {
    return (
      <div className="App">
        <Header />
        <Chart />
      </div>
    );
  }
}

export default App;
