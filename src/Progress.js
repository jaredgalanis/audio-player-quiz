import React, { Component } from 'react';
import './Progress.css'

class Progress extends Component {
  constructor(props) {
    super(props);

    this.handleProgressUpdate = this.handleProgressUpdate.bind(this);
    this.handleDuration = this.handleDuration.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleMakeTimeReadable = this.handleMakeTimeReadable.bind(this);

    this.state = {currentTime: null};
  }

  handleProgressUpdate() {
    let player = document.getElementsByClassName('player')[0],
        progressBar = document.getElementsByClassName('progress')[0];

    player.currentTime = progressBar.value;
  }

  handleDuration() {
    let player = document.getElementsByClassName('player')[0],
        progressBar = document.getElementsByClassName('progress')[0];

    progressBar.max = player.duration;

    let duration = document.getElementsByClassName('player')[0].duration,
        readableDuration = this.handleMakeTimeReadable(duration);
    this.props.onDurationChange(readableDuration);
  }

  handleTimeUpdate() {
    let player = document.getElementsByClassName('player')[0],
        progressBar = document.getElementsByClassName('progress')[0],
        readableTime = this.handleMakeTimeReadable(player.currentTime);

    progressBar.value = player.currentTime;
    this.setState({currentTime: readableTime});
  }

  handleMakeTimeReadable(seconds) {
    let sec, min;

    sec = Math.floor( seconds );
    min = Math.floor( sec / 60 );
    min = min >= 10 ? min : min;
    sec = Math.floor( sec % 60 );
    sec = sec >= 10 ? sec : '0' + sec;
    return `${min}:${sec}`;
  }

  componentDidMount() {
    let player = document.getElementsByClassName('player')[0],
        progressBar = document.getElementsByClassName('progress')[0];

    progressBar.addEventListener('change', this.handleProgressUpdate);
    player.addEventListener('timeupdate', this.handleTimeUpdate);
    player.addEventListener('loadedmetadata', this.handleDuration);
  }

  componentWillUnmount() {
    // clean up your rooms kids
    let player = document.getElementsByClassName('player')[0],
        progressBar = document.getElementsByClassName('progress')[0];

    progressBar.removeEventListener('change', this.handleProgressUpdate);
    player.removeEventListener('loadedmetadata', this.handleDuration);
    player.removeEventListener('timeupdate', this.handleTimeUpdate);
  }

  render() {
    const initialTime = this.props.initialTime,
          duration = this.props.duration,
          currentTime = this.state.currentTime;

    return (
      <div>
      <h6 className="pull-right">{currentTime} / {duration}</h6>
      <div className="progress-container">
        <input className="progress" type="range" defaultValue={initialTime} />
      </div>
      </div>
    );
  }


}

export default Progress;
