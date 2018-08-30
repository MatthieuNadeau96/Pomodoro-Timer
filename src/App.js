import React, { Component } from 'react';
import './App.css';

import Timer from './components/Timer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Timer workTimer={'25'} breakTimer={'5'} bigBreakTimer={'30'}/>
      </div>
    );
  }
}

export default App;
