import React, { Component } from 'react';
import Header from './Header';
import tooltip from './tooltip';
import Chart from './chart';


class App extends Component {
  //noinspection JSMethodCanBeStatic
    render() {
    return (
      <div className="App">
        <Header />
        <Chart />
        <tooltip />
      </div>
    );
  }
}

export default App;
