import React, { Component } from 'react';

class Timer extends Component {

  state = {
    count: 25,
    counting: false,
    setTimer: undefined,
    workTime: true,
    breakTime: false,
    bigBreakTime: false
  }


  render() {
    const {count, counting, workTime} = this.state
    return (
      <div>
        <p className="workPlayIcon"> { workTime ? <i className="fas fa-briefcase"/> : <i className="fas fa-coffee"/>} </p>
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
          this.setState({breakTime: true, workTime: false})
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
          this.setState({breakTime: false, bigBreakTime: true})
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
    this.setState({counting: false})
  }

  stopTimer = () => {
    const {counting, setTimer} = this.state
    if(!counting) {
      return
    }
    this.pauseTimer()

    this.setState({count: setTimer})

  }

  skipTimer = () => {
    const {workTimer, breakTimer, bigBreakTimer} = this.props
    const {workTime, count, setTimer, breakTime, bigBreakTime} = this.state

    if(workTime) {
      this.setState({count: 5, setTimer: 5, workTime: false, breakTime: true})
      this.pauseTimer()
    }
    else if (breakTime) {
      this.setState({count: bigBreakTimer, setTimer: bigBreakTimer, breakTime: false, bigBreakTime: true })
      this.pauseTimer()
    }
    else if (bigBreakTime) {
      this.setState({count: workTimer, setTimer: workTimer, bigBreakTime: false, workTime: true })
      this.pauseTimer()
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
    this.setState({counting: false})
  }

}

export default Timer;
