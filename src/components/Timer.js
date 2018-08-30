import React, { Component } from 'react';

class Timer extends Component {

  state = {
    count: 5,

    workTime: true,
    breakTime: false,
    bigBreakTime: false
  }


  render() {
    const {count} = this.state
    return (
      <div>
        <h1>Current Count: {count}</h1>
        <button onClick={this.pauseTimer}>Pause</button>
        <button onClick={this.startTimer}>Start</button>
        <button onClick={this.stopTimer}>Stop</button>
      </div>
    );
  }


  startTimer = () => {
    const {workTimer, breakTimer, bigBreakTimer} = this.props
    const {workTime, breakTime, bigBreakTime} = this.state
    if(workTime) {
      this.setState({ count: workTimer })

      this.myInterval = setInterval(() => {
        if(this.state.count === 0) {
          // ding alarm
          this.pauseTimer();
          this.setState({breakTime: true, workTime: false})
        } else {
          this.setState( prevState => ({
            count: prevState.count - 1
          }))
        }
      }, 1000)

    } else if (breakTime) {
      this.setState({ count: breakTimer })

      this.myInterval = setInterval(() => {
        if(this.state.count === 0) {
          // ding alarm
          this.pauseTimer();
          this.setState({breakTime: false, bigBreakTime: true})
        } else {
          this.setState( prevState => ({
            count: prevState.count - 1
          }))
        }
      }, 1000)
    } else if (bigBreakTime) {
      this.setState({ count: bigBreakTimer })

      this.myInterval = setInterval(() => {
        if(this.state.count === 0) {
          // ding alarm
          this.pauseTimer();
          this.setState({bigBreakTime: false, workTime: true})
        } else {
          this.setState( prevState => ({
            count: prevState.count - 1
          }))
        }
      }, 1000)
    }

  }

  pauseTimer = () => {
    clearInterval(this.myInterval);
  }

  stopTimer = () => {
    const {workTimer} = this.props
    this.setState({
      count: workTimer
    })
    this.pauseTimer()
  }
  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

}

export default Timer;
