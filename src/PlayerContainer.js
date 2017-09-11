import React, { Component } from 'react';
import AudioPlayer from './AudioPlayer';
import SelectOption from './SelectOption';
import './PlayerContainer.css';

class PlayerContainer extends Component {
  constructor(props) {
    super(props);

    //don't forget to bind the correct value of this to the methods handling state change
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.handleSongLoaded = this.handleSongLoaded.bind(this);

    // load initial states
    this.state = {
      isLoadingJSON: true,
      isLoadingMP3: false,
      songs: null,
      selectedOption: null,
      isPlaying: false,
      initialTime: 0,
      initialVolume: .75};
  }

  componentDidMount() {
    // fetch the song JSON data and update loading state. songs are a mix of local and remote songs. I ended up using music from archive.org because most resources on FMA.org were not streamable for me. And fetching the entire song from there was a long task.
    fetch(process.env.PUBLIC_URL + '/songData.json').then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          this.setState({songs: data, selectedOption: data.data[0], isLoadingJSON: false});
        });
      }
    }).catch(function(error) {
      console.log(`There has been a problem with your fetch operation: ${error.message}`);
    });
  }

  handleSelectChange(selectionId) {
    let selectedSong = this.state.songs.data.filter((song) => {
      return song.id === selectionId;
    });

    // update to the state for the newly picked song
    this.setState({selectedOption: selectedSong[0], isPlaying: false, isLoadingMP3: true});
  }

  handlePlayClick() {
    this.setState({isPlaying: true});
  }

  handlePauseClick() {
    this.setState({isPlaying: false});
  }

  handleSongLoaded() {
    this.setState({isLoadingMP3: false});
  }

  render() {
    // prepare all the things to subcomponents as const to prevent undesired direct manipulation of state
    const isLoadingJSON = this.state.isLoadingJSON,
          isLoadingMP3 = this.state.isLoadingMP3,
          songs = this.state.songs ? this.state.songs.data : null,
          selectedOption = this.state.selectedOption,
          isPlaying = this.state.isPlaying,
          initialTime = this.state.initialTime,
          initialVolume = this.state.initialVolume;

    // account for potential long load times of song JSON data and song files in JSX logic
    return (
      <div className="App" id="overrides">
        {isLoadingJSON ? (
          <p>Loading Song List...</p>
        ) : (
          <div className="row">
            {isLoadingMP3 ? (<p>Loading Song ...</p>) : (
              <div>
                <div className="row col-sm-12 no-left-pad">
                  <div className="col-sm-2 pull-left no-left-pad">
                    <SelectOption
                      selectedOption={selectedOption} onSelectChange={this.handleSelectChange} optionData={songs} />
                  </div>
                  <div className="col-sm-10" />
                </div>
                <div className="player-container row col-sm-12">
                  <AudioPlayer
                    isPlaying={isPlaying}
                    isLoadingMP3={isLoadingMP3}
                    title={selectedOption.attributes.title}
                    url={selectedOption.attributes.url}
                    artist={selectedOption.attributes.artist}
                    initialTime={initialTime}
                    initialVolume={initialVolume}
                    onPlayClick={this.handlePlayClick}
                    onPauseClick={this.handlePauseClick}
                    onSongLoaded={this.handleSongLoaded} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default PlayerContainer;
