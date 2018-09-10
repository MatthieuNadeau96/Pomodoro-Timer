import React, { Component } from 'react';

import { Circle } from 'rc-progress';

class Timer extends Component {

  state = {
    seconds: this.props.workTimer,
    time: {},
    counting: false,
    mode: 'WORK',
    progressBarCountdown: 100,
    workCount: 0,
    workCountTotal: 4
  }

  render() {
    const {counting, progressBarCountdown, mode, workCount} = this.state

    return (
      <div className="timerContainer">
        <div className="workCountContainer">
          <div className={ workCount >= 1 ? "dot coloredDot" : "dot"}/>
          <div className={ workCount >= 2 ? "dot coloredDot" : "dot"}/>
          <div className={ workCount >= 3 ? "dot coloredDot" : "dot"}/>
          <div className={ workCount >= 4 ? "dot coloredDot" : "dot"}/>
        </div>
        <Circle
          className="circleProgress"
          percent={progressBarCountdown}
          strokeWidth="4"
          strokeColor="#d67e73"
        />
        <div className="counterContainer">
          <p className="workPlayIcon"> { mode === 'WORK' ? <i className="fas fa-briefcase"/> : <i className="fas fa-coffee"/>} </p>
          <h1 className="counter">{this.state.time.m}:{this.state.time.s}</h1>
        </div>
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

  componentDidMount = () => {
    this.resetDisplay(this.props.workTimer);
  }

  resetDisplay = (secs) => {
    let timeLeftVar = this.secondsToTime(secs);
    this.setState({ time: timeLeftVar });
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


  countDown = () => {
    const { workTimer, breakTimer, bigBreakTimer } = this.props
    const { mode, workCount, workCountTotal } = this.state;
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    if (seconds === 0) {
      // ding alarm
      if (mode === 'WORK') {
        this.setState({ mode: 'BREAK', seconds: breakTimer, progressBarCountdown: 100, workCount: workCount + 1 })
        this.resetDisplay(breakTimer);
      }
      if (mode === 'BREAK' && workCount < workCountTotal) {
        this.setState({ mode: 'WORK', seconds: workTimer, progressBarCountdown: 100 })
        this.resetDisplay(workTimer);
      }
      if (mode === 'BREAK' && workCount === workCountTotal) {
        this.setState({ mode: 'BIGBREAK', seconds: bigBreakTimer, progressBarCountdown: 100 })
        this.resetDisplay(bigBreakTimer);
      }
      if (mode === 'BIGBREAK') {
        this.setState({ mode: 'WORK', seconds: workTimer, progressBarCountdown: 100, workCount: 0 })
        this.resetDisplay(workTimer);
      }
      this.pauseTimer();
    }
  }

  startTimer = () => {
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
    const { workTimer, breakTimer, bigBreakTimer } = this.props
    const { counting, mode } = this.state
    if(!counting) {
      return
    }
    this.pauseTimer()
    if(mode === 'WORK') {
    this.resetDisplay(workTimer)
    this.setState({seconds: workTimer})
    }
    if (mode === 'BREAK') {
    this.resetDisplay(breakTimer)
    this.setState({seconds: breakTimer})
    }
    else if (mode === 'BIGBREAK') {
    this.resetDisplay(bigBreakTimer)
    this.setState({seconds: bigBreakTimer})
    }
    this.setState({progressBarCountdown: 100})
  }

  skipTimer = () => {
    const {workTimer, breakTimer, bigBreakTimer} = this.props
    const { mode } = this.state


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
