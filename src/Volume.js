import React, { Component } from 'react';
import Speaker from './volume.svg';
import './Volume.css';

class Volume extends Component {
  constructor(props) {
    super(props);
    this.state = {volumeDrag: false};
  }

  // an alternative strategy to using an input with a range type to create a slider (see progress bar for input range type version)
  handleUpdateVolume(x, vol) {
    let volume = document.getElementsByClassName('volume')[0],
        volumeBar = document.getElementsByClassName('volumeBar')[0],
        percentage;

    // if vol is passed set the percentage of slider fill as that, otherwise allow the cursor position (as relative to the left bounding rect) determine the slider fill
    if (vol) {
      percentage = vol * 100;
    } else {
      let position = x - volume.getBoundingClientRect().left;
      percentage = 100 * position / volume.offsetWidth;
    }

    // handle if percent greater or less than max or min of possible slider fill
    if (percentage > 100) {
      percentage = 100;
    }
    if (percentage < 0) {
      percentage = 0;
    }

    // set the fill of the slider using percentage calculated
    volumeBar.style.width = `${percentage}%`;
    let volumePercent = percentage / 100;
    this.props.onVolumeChange(volumePercent);
  };

  componentDidMount() {
    let volumeSlider = document.getElementsByClassName('volume')[0],
        volumeBar = document.getElementsByClassName('volumeBar')[0];

    // set the initial volume
    volumeBar.style.width = `${this.props.initialVolume * 100}%`;

    // add event listeners for handling volume change mouse events
    volumeSlider.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.setState({volumeDrag: true});
      this.handleUpdateVolume(e.pageX);
    });

    document.addEventListener('mouseup', (e) => {
      if (this.state.volumeDrag) {
        this.setState({volumeDrag: false});
        this.handleUpdateVolume(e.pageX);
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (this.state.volumeDrag) {
        this.handleUpdateVolume(e.pageX);
      }
    });
  }

  componentWillUnmount() {
    // let volumeSlider = document.getElementsByClassName('volume')[0];
    // volumeSlider.addEventListener('mousedown');
    // document.addEventListener('mouseup');
    // document.addEventListener('mouseup');
    // document.addEventListener('mousemove');
  }

  render() {
    return (
      <div className="volume-container row col-sm-12">
        <div className="col-sm-1">
          <img src={Speaker} className="speaker" alt="volume speaker" />
        </div>
        <div className="col-sm-11">
          <div className="volume" title="Set volume">
            <span className="volumeBar" />
          </div>
        </div>
      </div>
    );
  }
}

export default Volume;
