import React, { Component } from 'react';

class Timer extends Component {

  state = {
    count: 25,
    counting: false,
    workTime: true,
    breakTime: false,
    bigBreakTime: false
  }


  render() {
    const {count, counting, workTime} = this.state
    return (
      <div>
        <p className="workPlayIcon"> { workTime ? <i class="fas fa-briefcase"/> : <i class="fas fa-coffee"/>} </p>
        <h1 className="counter">{count}</h1>

        <button className="skip actionBtn"><i class="fas fa-step-forward"/></button>
        {
          counting ?
          <button
            className="play actionBtn"
            onClick={this.pauseTimer}>
            <i class="fas fa-pause"/>
          </button>
            : <button 
                className="play actionBtn"
                onClick={this.startTimer}>
                <i class="fas fa-play"/>
              </button>
        }
        <button className="stop actionBtn" onClick={this.stopTimer}><i class="fas fa-stop"/></button>
      </div>
    );
  }


  startTimer = () => {
    const {workTimer, breakTimer, bigBreakTimer} = this.props
    const {workTime, breakTime, bigBreakTime} = this.state

    this.setState({counting: true})

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
    }
    else if (breakTime) {
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
    }
    else if (bigBreakTime) {
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
    this.setState({counting: false})
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
    this.setState({counting: false})
  }

}

export default Timer;
