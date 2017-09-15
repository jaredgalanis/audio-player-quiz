import React, { Component } from 'react';

class Progress extends Component {
  constructor(props) {
    super(props);

    // lets bind our context
    // leaving this style of binding since arrow functions are best suited for non-method functions and all the handle functions are methods on the class https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions. just mentioning here so you don't think I ignored your feedback.
    this.handleDuration = this.handleDuration.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleMakeTimeReadable = this.handleMakeTimeReadable.bind(this);
    this.handleProgressUpdate = this.handleProgressUpdate.bind(this);

    // and set our initial state
    this.state = {currentTime: this.handleMakeTimeReadable(0), duration: this.handleMakeTimeReadable(0)};
  }

  componentDidMount() {
    // set properties requiring the presence of DOM elements that you'll need across the class
    this.player = document.getElementsByClassName('player')[0];
    this.progressBar = document.getElementsByClassName('progress')[0];

    // listen up for your events
    this.progressBar.addEventListener('change', this.handleProgressUpdate);
    this.player.addEventListener('timeupdate', this.handleTimeUpdate);
    this.player.addEventListener('loadedmetadata', this.handleDuration);
    this.player.addEventListener('ended', this.props.onSongEnd);
  }

  handleProgressUpdate() {
    // sync player current time prop with progress bar
    this.player.currentTime = this.progressBar.value;
  }

  handleDuration() {
    // sync progress bar and player durations
    this.progressBar.max = this.player.duration;

    // format the duration for readability and set the duration state
    let readableDuration = this.handleMakeTimeReadable(this.player.duration);
    this.setState({duration: readableDuration});
  }

  handleTimeUpdate() {
    // format current time for readability
    let readableTime = this.handleMakeTimeReadable(this.player.currentTime);

    // sync the progress bar progress with player and set the current time state
    this.progressBar.value = this.player.currentTime;
    this.setState({currentTime: readableTime});
  }

  handleMakeTimeReadable(seconds) {
    // make time human readable in minutes and seconds m:ss
    let sec, min;

    sec = Math.floor( seconds );
    min = Math.floor( sec / 60 );
    min = min >= 10 ? min : '0' + min;
    sec = Math.floor( sec % 60 );
    sec = sec >= 10 ? sec : '0' + sec;
    return `${min}:${sec}`;
  }

  componentWillUnmount() {
    // clean up your room kids
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
