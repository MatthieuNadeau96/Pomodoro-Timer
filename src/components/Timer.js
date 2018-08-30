import React, { Component } from 'react';

class Timer extends Component {

  state = {
    count: 25
  }


  render() {
    const {count} = this.state
    return (
      <div>
        <h1>Current Count: {count}</h1>
        <button onClick={this.startTimer}>Start</button>
        <button onClick={this.pauseTimer}>Pause</button>
        <button onClick={this.stopTimer}>Stop</button>
      </div>
    );
  }

  componentDidMount () {
    const {startCount} = this.props
    this.setState({
      count: startCount
    })
  }

  startTimer = () => {
    this.myInterval = setInterval(() => {
      this.setState( prevState => ({
        count: prevState.count - 1
      }))
    }, 1000)
  }

  pauseTimer = () => {
    clearInterval(this.myInterval);
  }

  stopTimer = () => {
    const {startCount} = this.props
    this.setState({
      count: startCount
    })
    this.pauseTimer()
  }
  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

}

export default Timer;
