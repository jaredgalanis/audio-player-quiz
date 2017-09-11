import React, { Component } from 'react';

class Progress extends Component {
  constructor(props) {
    super(props);

    this.handleDuration = this.handleDuration.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleMakeTimeReadable = this.handleMakeTimeReadable.bind(this);
    this.handleProgressUpdate = this.handleProgressUpdate.bind(this);

    this.state = {currentTime: null, duration: null};
  }

  componentDidMount() {
    this.player = document.getElementsByClassName('player')[0];
    this.progressBar = document.getElementsByClassName('progress')[0];

    this.progressBar.addEventListener('change', this.handleProgressUpdate);
    this.player.addEventListener('timeupdate', this.handleTimeUpdate);
    this.player.addEventListener('loadedmetadata', this.handleDuration);
  }

  handleProgressUpdate() {
    this.player.currentTime = this.progressBar.value;
  }

  handleDuration() {
    this.progressBar.max = this.player.duration;

    let readableDuration = this.handleMakeTimeReadable(this.player.duration);
    this.setState({duration: readableDuration});

  }

  handleTimeUpdate() {
    let readableTime = this.handleMakeTimeReadable(this.player.currentTime);

    this.progressBar.value = this.player.currentTime;
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

  componentWillUnmount() {
    // clean up your rooms kids
    this.progressBar.removeEventListener('change', this.handleProgressUpdate);
    this.player.removeEventListener('loadedmetadata', this.handleDuration);
    this.player.removeEventListener('timeupdate', this.handleTimeUpdate);
  }

  render() {
    const initialTime = this.props.initialTime,
          duration = this.state.duration,
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
