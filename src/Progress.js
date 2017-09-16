import React, { Component } from 'react';

class Progress extends Component {
  componentDidMount() {
    // set properties requiring the presence of DOM elements that you'll need across the class
    this.progressBar = document.getElementsByClassName('progress')[0];
  }


  handleTimeUpdate = () => {
    // set the current time state
    this.setState({currentTime: this.player.currentTime});
  }

  handleMakeTimeReadable = (seconds) => {
    // make time human readable in minutes and seconds mm:ss
    let sec, min;

    sec = Math.floor( seconds );
    min = Math.floor( sec / 60 );
    min = min >= 10 ? min : '0' + min;
    sec = Math.floor( sec % 60 );
    sec = sec >= 10 ? sec : '0' + sec;
    return `${min}:${sec}`;
  }

  handleProgressUpdate = () => {
    // sync player current time prop with progress bar
    this.props.onProgressUpdate(this.progressBar.value);
  }

  render() {
    const readableDuration = this.handleMakeTimeReadable(this.props.duration),
          readableCurrentTime = this.handleMakeTimeReadable(this.props.currentTime),
          duration = this.props.duration,
          currentTime = this.props.currentTime;

    return (
      <div>
        <h6 className="pull-right">{readableCurrentTime} / {readableDuration}</h6>
        <div className="progress-container">
          <input className="progress" type="range" defaultValue={currentTime} max={duration} onChange={this.handleProgressUpdate} />
        </div>
      </div>
    );
  }


}

export default Progress;
