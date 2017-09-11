import React, { Component } from 'react';
import Volume from './Volume';
import Progress from './Progress';
import Play from './play.svg';
import Pause from './pause.svg';
import './AudioPlayer.css';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);

    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);

    this.state = {volume: null, duration: null};
  }

  handleVolumeChange(volume) {
    let player = document.getElementsByClassName('player')[0];
    player.volume = volume;
    this.setState({volume: volume});
  }

  handlePlayClick() {
    let player = document.getElementsByClassName('player')[0];
    player.play();
    this.props.onPlayClick();
  }

  handlePauseClick() {
    let player = document.getElementsByClassName('player')[0];
    player.pause();
    this.props.onPauseClick();
  }

  handleDurationChange(duration) {
    this.setState({duration: duration});
  }

  componentDidMount() {
    let player = document.getElementsByClassName('player')[0];
    player.volume = this.props.initialVolume;

    player.setAttribute('src', this.props.url);
    player.load();

    player.addEventListener('canplay', this.props.onSongLoaded());

    ////////////////////////////////////////////////////
   // Alt fetch strategy if need to grab whole song. //
  // Ended up not needing, but thought it would be  //
 //good visibility into my thinking.               //
////////////////////////////////////////////////////

    // fetch(process.env.PUBLIC_URL + this.props.url).then(function(response) {
    //   if(response.ok) {
    //     return response.blob();
    //   }
    // }).then(function(myBlob) {
    //   let objectURL = URL.createObjectURL(myBlob);
    //   player.setAttribute('src',objectURL);
    //   player.load();
    // }).catch(function(error) {
    //   console.log(`There has been a problem with your fetch operation: ${error.message}`);
    // });
  }

  componentWillUnmount() {
    let player = document.getElementsByClassName('player')[0];

    player.removeEventListener('canplay', this.props.onSongLoaded());
  }

  render() {
    const initialVolume = this.props.initialVolume,
          artist = this.props.artist,
          title = this.props.title,
          duration = this.state.duration;

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
          <Progress duration={duration} onDurationChange={this.handleDurationChange} />
        </div>
      </div>
    );
  }

}

export default AudioPlayer
