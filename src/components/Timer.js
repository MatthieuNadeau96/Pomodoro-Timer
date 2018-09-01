import React, { Component } from 'react';

import { Circle } from 'rc-progress';

class Timer extends Component {

  state = {
    counting: false,
    setTimer: undefined,
    mode: 'WORK',
    progressBarCountdown: 100,
    time: {},
    seconds: 26
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
    this.resetDisplay(this.props.workTimer);
  }

  resetDisplay = (secs) => {
    let timeLeftVar = this.secondsToTime(secs);
    this.setState({ time: timeLeftVar });
  }

  render() {
    const {count, counting, progressBarCountdown, mode} = this.state

    return (
      <div className="timerContainer">
        <p className="workPlayIcon"> { mode === 'WORK' ? <i className="fas fa-briefcase"/> : <i className="fas fa-coffee"/>} </p>
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
      if (mode === 'WORK') {
        this.setState({ mode: 'BREAK', seconds: breakTimer, progressBarCountdown: 100 })
        this.resetDisplay(breakTimer);
      }
      if (mode === 'BREAK') {
        this.setState({ mode: 'BIGBREAK', seconds: bigBreakTimer, progressBarCountdown: 100 })
        this.resetDisplay(bigBreakTimer);
      }
      if (mode === 'BIGBREAK') {
        this.setState({ mode: 'WORK', seconds: workTimer, progressBarCountdown: 100 })
        this.resetDisplay(workTimer);
      }
      this.pauseTimer();
    }
  }

  startTimer = () => {
    const { workTimer, breakTimer, bigBreakTimer } = this.props
    const { mode } = this.state

    this.setState({counting: true})

    if(mode === 'WORK') {
      this.myInterval = setInterval(this.countDown, 1000);
    }
    if (mode === 'BREAK') {
      this.myInterval = setInterval(this.countDown, 1000);
    }
    else if (mode === 'BIGBREAK') {
      this.myInterval = setInterval(this.countDown, 1000);
    }

    this.timerCountDown()
  }

  pauseTimer = () => {
    clearInterval(this.myInterval);
    clearInterval(this.progress);
    this.setState({ counting: false })
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
    const { mode } = this.state
    console.log(mode)
    console.log(this.state.seconds)


    if (mode === 'WORK') {
      this.setState({ mode: 'BREAK', seconds: breakTimer, progressBarCountdown: 100 })
      console.log(mode)
      console.log(this.state.seconds)
      this.resetDisplay(breakTimer);
    }
    if (mode === 'BREAK') {
      this.setState({ mode: 'BIGBREAK', seconds: bigBreakTimer, progressBarCountdown: 100 })
      console.log(mode)
      console.log(this.state.seconds)
      this.resetDisplay(bigBreakTimer);
    }
    if (mode === 'BIGBREAK') {
      this.setState({ mode: 'WORK', seconds: workTimer, progressBarCountdown: 100 })
      console.log(mode)
      console.log(this.state.seconds)
      this.resetDisplay(workTimer);
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
