import React, { Component } from 'react';
import AudioPlayer from './AudioPlayer';
import SelectOption from './SelectOption';

class PlayerContainer extends Component {
  constructor(props) {
    super(props);

    // and set our initial state
    this.state = {
      isLoadingJSON: true,
      isLoadingMP3: true,
      songs: null,
      selectedOption: null,
      isPlaying: false,
      initialVolume: .75};
  }

  componentDidMount() {
    // fetch the song JSON data (formatted in conformance with JSON-API spec) and update loading state. songs are a mix of local and remote songs. I ended up using music from archive.org because most resources on FMA.org were not streamable for me. And fetching the entire song from there was a long task.
    fetch(process.env.PUBLIC_URL + '/songData.json').then((response) => {
      // if the response is 200 or OK process the JSON.
      if(response.ok) {
        return response.json().then((data) => {
          // set state with first song data
          return this.setState({songs: data, selectedOption: data.data[0], isLoadingJSON: false});
        });
      }
      // or throw and log error msg if it was not.
      throw new Error('Network response was not ok.');
    }).catch(function(error) {
      console.log(`There has been a problem with your fetch operation: ${error.message}`);
    });
  }

  handleSelectChange = (selectionId) => {
    // return the selected song obj with matching id
    let selectedSong = this.state.songs.data.filter((song) => {
      return song.id === selectionId;
    });

    // update to the state for the newly picked song
    this.setState({selectedOption: selectedSong[0], isPlaying: false, isLoadingMP3: true});
  }

  handlePlayClick = () => {
    this.setState({isPlaying: true});
  }

  handlePauseClick = () => {
    this.setState({isPlaying: false});
  }

  handleSongLoaded = () => {
    this.setState({isLoadingMP3: false});
  }

  render() {
    // prepare all the things being passed to child components as const to prevent undesired direct manipulation of state. prefer single var/let/const declaration style for readability even if not totally necessary.
    const isLoadingJSON = this.state.isLoadingJSON,
          isLoadingMP3 = this.state.isLoadingMP3,
          songs = this.state.songs ? this.state.songs.data : null,
          selectedOption = this.state.selectedOption,
          isPlaying = this.state.isPlaying,
          initialVolume = this.state.initialVolume;

    // handle potential long load times of song JSON data and song files in JSX logic with conditional rendering
    return (
      <div>
        {isLoadingJSON ? (
          <p>Loading Song List...</p>
        ) : (
          <div className="row">
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
                  initialVolume={initialVolume}
                  onSongLoaded={this.handleSongLoaded}
                  onPlayClick={this.handlePlayClick}
                  onPauseClick={this.handlePauseClick} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PlayerContainer;
