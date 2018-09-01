import React, { Component } from 'react';
import './App.css';

import Timer from './components/Timer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Timer workTimer={'1500'} breakTimer={'300'} bigBreakTimer={'1800'} />
      </div>
    );
  }
}

export default App;
