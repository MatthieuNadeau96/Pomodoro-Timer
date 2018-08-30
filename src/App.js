import React, { Component } from 'react';
import './App.css';

import Timer from './components/Timer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Timer startCount={'50'}/>
      </div>
    );
  }
}

export default App;
