import React, { Component } from 'react';
import AudioPlayer from './AudioPlayer';
import SelectOption from './SelectOption';

class PlayerContainer extends Component {
  constructor(props) {
    super(props);

    // lets bind our context
    // leaving this style of binding since arrow functions are best suited for non-method functions and all the handle functions are methods on the class https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions. just mentioning here so you don't think I ignored your feedback.
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.handleSongLoaded = this.handleSongLoaded.bind(this);

    // and set our initial state
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

  handleSelectChange(selectionId) {
    // return the selected song obj with matching id
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
    // prepare all the things being passed to child components as const to prevent undesired direct manipulation of state. prefer single var/let/const declaration style for readability even if not totally necessary.
    const isLoadingJSON = this.state.isLoadingJSON,
          isLoadingMP3 = this.state.isLoadingMP3,
          songs = this.state.songs ? this.state.songs.data : null,
          selectedOption = this.state.selectedOption,
          isPlaying = this.state.isPlaying,
          initialTime = this.state.initialTime,
          initialVolume = this.state.initialVolume;

    // handle potential long load times of song JSON data and song files in JSX logic with conditional rendering
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
