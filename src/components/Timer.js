import React, { Component } from 'react';

import { Circle } from 'rc-progress'

class Timer extends Component {

  state = {
    count: 25,
    counting: false,
    setTimer: undefined,
    workTime: true,
    breakTime: false,
    bigBreakTime: false,
    progressBarCountdown: 100
  }


  render() {
    const {count, counting, workTime, progressBarCountdown} = this.state
    return (
      <div>
        <p className="workPlayIcon"> { workTime ? <i className="fas fa-briefcase"/> : <i className="fas fa-coffee"/>} </p>
        <Circle className="circleProgress" percent={progressBarCountdown} strokeWidth="4" strokeColor="salmon" />
        <h1 className="counter">{count}</h1>

        <button className="skip actionBtn" onClick={this.skipTimer}><i className="fas fa-step-forward"/></button>
        {
          counting ?
          <button
            className="play actionBtn"
            onClick={this.pauseTimer}>
            <i className="fas fa-pause"/>
          </button>
            : <button
                className="play actionBtn"
                onClick={this.startTimer}>
                <i className="fas fa-play"/>
              </button>
        }
        <button className="stop actionBtn" onClick={this.stopTimer}><i className="fas fa-stop"/></button>
      </div>
    );
  }

  timerCountDown = () => {
    const { progressBarCountdown, count, counting } = this.state
    // this.setState({progressBarCountdown: count})
    this.progress = setInterval(() => {
      if (count <= 0) {
        clearInterval(this.progress);
      }
      this.setState( prevState => ({
        progressBarCountdown: prevState.progressBarCountdown - 1
      }))
    }, 1000 / (100 / count));

  }

  // TODO: I have to fix the way startTimer interacts with pauseTimer
    // as of right now when I press play after pausing, the timer resets back to what is set inside the if conditions below 

  startTimer = () => {
    const {workTimer, breakTimer, bigBreakTimer} = this.props
    const {workTime, breakTime, bigBreakTime} = this.state

    this.setState({counting: true})

    if(workTime) {
      this.setState({ count: workTimer, setTimer: workTimer })
      this.myInterval = setInterval(() => {
        if(this.state.count === 0) {
          // ding alarm
          this.pauseTimer();
          this.setState({breakTime: true, workTime: false, count: breakTimer, progressBarCountdown: 100 })
        } else {
          this.setState( prevState => ({
            count: prevState.count - 1
          }))
        }
      }, 1000)
    }
    else if (breakTime) {
      this.setState({ count: breakTimer, setTimer: breakTimer })
      this.myInterval = setInterval(() => {
        if(this.state.count === 0) {
          // ding alarm
          this.pauseTimer();
          this.setState({breakTime: false, bigBreakTime: true, count: bigBreakTimer, progressBarCountdown: 100 })
        } else {
          this.setState( prevState => ({
            count: prevState.count - 1
          }))
        }
      }, 1000)
    }
    else if (bigBreakTime) {
      this.setState({ count: bigBreakTimer, setTimer: bigBreakTimer })
      this.myInterval = setInterval(() => {
        if(this.state.count === 0) {
          // ding alarm
          this.pauseTimer();
          this.setState({bigBreakTime: false, workTime: true, count: workTimer, progressBarCountdown: 100 })
        } else {
          this.setState( prevState => ({
            count: prevState.count - 1
          }))
        }
      }, 1000)
    }

    this.timerCountDown()
  }

  pauseTimer = () => {
    clearInterval(this.myInterval);
    clearInterval(this.progress);
    this.setState( prevState => ({
      counting: false
    }))
  }

  stopTimer = () => {
    const {counting, setTimer} = this.state
    if(!counting) {
      return
    }
    this.pauseTimer()

    this.setState({count: setTimer, progressBarCountdown: 100})

  }

  skipTimer = () => {
    const {workTimer, breakTimer, bigBreakTimer} = this.props
    const {workTime, count, setTimer, breakTime, bigBreakTime} = this.state

    if(workTime) {
      this.setState({count: 5, setTimer: 5, workTime: false, breakTime: true, progressBarCountdown: 100 })
      this.pauseTimer()
    }
    else if (breakTime) {
      this.setState({count: bigBreakTimer, setTimer: bigBreakTimer, breakTime: false, bigBreakTime: true, progressBarCountdown: 100 })
      this.pauseTimer()
    }
    else if (bigBreakTime) {
      this.setState({count: workTimer, setTimer: workTimer, bigBreakTime: false, workTime: true, progressBarCountdown: 100 })
      this.pauseTimer()
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
    this.setState({counting: false})
  }

}

export default Timer;
