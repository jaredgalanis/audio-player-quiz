import React, { Component } from 'react';
import Volume from './Volume';
import Progress from './Progress';
import Play from './play.svg';
import Pause from './pause.svg';

class AudioPlayer extends Component {

  constructor(props) {
    super(props);
    // set our initial state
    this.state = {currentTime: 0, duration: 0};
  }

  componentDidMount() {
    // set properties requiring the presence of DOM elements that you'll need across the class
    this.player = document.getElementsByClassName('player')[0];
    this.player.volume = this.props.initialVolume;
  }

  handleVolumeChange = (volume) => {
    this.player.volume = volume;
  }

  handlePlayClick = () => {
    this.player.play();
    this.props.onPlayClick();
  }

  handlePauseClick = () => {
    this.player.pause();
    this.props.onPauseClick();
  }

  handleSongEnd = () => {
    this.player.pause();
    this.player.currentTime = 0;
    this.setState({currentTime: this.player.currentTime});
    this.props.onPauseClick();
  }

  handleSongLoaded = () => {
    this.props.onSongLoaded();
  }

  handleDuration = () => {
    // set the duration state
    this.setState({duration: this.player.duration});
  }

  handleTimeUpdate = () => {
    // set the current time state
    this.setState({currentTime: this.player.currentTime});
  }

  handleProgressUpdate = (progress) => {
    // sync player current time prop with progress bar
    this.setState({currentTime: progress});
    this.player.currentTime = progress;
  }

  render() {
    const initialVolume = this.props.initialVolume,
          isLoadingMP3 = this.props.isLoadingMP3,
          duration = this.state.duration,
          currentTime = this.state.currentTime,
          artist = this.props.artist,
          title = this.props.title,
          url = this.props.url;

    let playPause = null;

    // sometimes conditional rendering just easier handled outside of JSX
    if (isLoadingMP3) {
      playPause = <p>Loading Song...</p>
    } else {
      if (this.props.isPlaying) {
        playPause = <img className="center-block col-sm-4 no-left-pad" src={Pause} width="100" height="100" alt="pause" onClick={this.handlePauseClick} />
      } else {
        playPause = <img className="center-block col-sm-4 no-left-pad" src={Play} width="100" height="100" alt="play" onClick={this.handlePlayClick} />
      }
    }

    return (
      <div>
        <div className="row col-sm-12 controls-container">
          <div className="row col-sm-12">
            <div className="pull-left col-sm-6">
              {playPause}
              <div className="col-sm-8 title-artist-container">
                <h5>{artist}</h5>
                <h5 className="text-muted">{title}</h5>
              </div>
            </div>
            <div className="pull-right col-sm-6">
              <Volume initialVolume={initialVolume} onVolumeChange={this.handleVolumeChange} />
            </div>
          </div>
          <audio className="player" preload="auto" type="audio/mpeg" onCanPlay={this.handleSongLoaded} onTimeUpdate={this.handleTimeUpdate} onLoadedMetadata={this.handleDuration} onEnded={this.handleSongEnd} src={url} />
        </div>
        <div className="row col-sm-12">
          <Progress duration={duration} currentTime={currentTime} onProgressUpdate={this.handleProgressUpdate} />
        </div>
      </div>
    );
  }

}

export default AudioPlayer
