import React, { Component } from 'react';
import Volume from './Volume';
import Progress from './Progress';
import Play from './play.svg';
import Pause from './pause.svg';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    // lets bind our context
    // leaving this style of binding since arrow functions are best suited for non-method functions and all the handle functions are methods on the class https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions. just mentioning here so you don't think I ignored your feedback.
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.handleSongEnd = this.handleSongEnd.bind(this);
  }

  componentDidMount() {
    // set properties requiring the presence of DOM elements that you'll need across the class
    this.player = document.getElementsByClassName('player')[0];
    this.progressBar = document.getElementsByClassName('progress')[0];

    this.player.volume = this.props.initialVolume;
    this.player.setAttribute('src', this.props.url);
    this.player.load();

    this.player.addEventListener('canplay', this.props.onSongLoaded());
    this.player.addEventListener('ended', this.props.handleSongEnd);
  }

  handleVolumeChange(volume) {
    this.player.volume = volume;
  }

  handlePlayClick() {
    this.player.play();
    this.props.onPlayClick();
  }

  handlePauseClick() {
    this.player.pause();
    this.props.onPauseClick();
  }

  handleSongEnd() {
    this.player.pause();
    this.player.currentTime = 0;
    this.props.onPauseClick();
  }

  componentWillUnmount() {
    this.player.removeEventListener('canplay', this.props.onSongLoaded());
  }

  render() {
    const initialVolume = this.props.initialVolume,
          artist = this.props.artist,
          title = this.props.title;

    let playPause = null;

    // sometimes conditional rendering just easier handled outside of JSX
    if (this.props.isPlaying) {
      playPause = <img className="center-block col-sm-4 no-left-pad" src={Pause} width="100" height="100" alt="pause" onClick={this.handlePauseClick} />
    } else {
      playPause = <img className="center-block col-sm-4 no-left-pad" src={Play} width="100" height="100" alt="play" onClick={this.handlePlayClick} />
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
          <audio className="player" preload="auto" type="audio/mpeg" />
        </div>
        <div className="row col-sm-12">
          <Progress onSongEnd={this.handleSongEnd} />
        </div>
      </div>
    );
  }

}

export default AudioPlayer
