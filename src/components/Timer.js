import React, { Component } from 'react';

import { Circle } from 'rc-progress';

class Timer extends Component {

  state = {
    counting: false,
    setTimer: undefined,
    mode: 'WORK',
    progressBarCountdown: 100,
    time: {},
    seconds: this.props.workTimer
  }

  secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount = () => {
    this.resetDisplay();
  }

  resetDisplay = () => {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  render() {
    const {count, counting, workTime, progressBarCountdown} = this.state

    return (
      <div className="timerContainer">
        <p className="workPlayIcon"> { workTime ? <i className="fas fa-briefcase"/> : <i className="fas fa-coffee"/>} </p>
        <Circle
          className="circleProgress"
          percent={progressBarCountdown}
          strokeWidth="4"
          strokeColor="salmon"
        />
      <h1 className="counter">{this.state.time.m}:{this.state.time.s}</h1>
        <div className="actionBtnContainer">
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
      </div>
    );
  }

  // TODO: I have to fix the way startTimer interacts with pauseTimer
    // as of right now when I press play after pausing, the timer resets back to what is set inside the if conditions below

  countDown = () => {
    const { workTimer, breakTimer, bigBreakTimer } = this.props
    const { mode } = this.state;
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    if (seconds === 0) {
      // ding alarm
      this.pauseTimer();
      if (mode === 'WORK') { this.setState({ mode: 'BREAK', seconds: breakTimer, progressBarCountdown: 100 }) }
      if (mode === 'BREAK') { this.setState({ mode: 'BIGBREAK', seconds: bigBreakTimer, progressBarCountdown: 100 }) }
      if (mode === 'BIGBREAK') { this.setState({ mode: 'WORK', seconds: workTimer, progressBarCountdown: 100 }) }
      this.resetDisplay();
    }
  }

  startTimer = () => {
    const { workTimer, breakTimer, bigBreakTimer } = this.props
    const { mode } = this.state

    this.setState({counting: true})

    if(mode === 'WORK') {
      this.setState({ seconds: workTimer, setTimer: workTimer })
      this.myInterval = setInterval(this.countDown, 1000);
    }
    if (mode === 'BREAK') {
      this.setState({ seconds: breakTimer, setTimer: breakTimer })
      this.myInterval = setInterval(this.countDown, 1000);
    }
    else if (mode === 'BIGBREAK') {
      this.setState({ seconds: bigBreakTimer, setTimer: bigBreakTimer })
      this.myInterval = setInterval(this.countDown, 1000);
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
    const {workTimer, bigBreakTimer} = this.props
    const {workTime, breakTime, bigBreakTime} = this.state

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

  timerCountDown = () => {
    const { seconds } = this.state
    this.progress = setInterval(() => {
      if (seconds <= 0) {
        clearInterval(this.progress);
      }
      this.setState( prevState => ({
        progressBarCountdown: prevState.progressBarCountdown - 1
      }))
    }, 1000 / (100 / seconds));

  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
    this.setState({counting: false})
  }

}

export default Timer;
