import React from 'react';
import ReactDOM from 'react-dom';

// i know. please forgive me. needed quick way to style.
import 'bootstrap/dist/css/bootstrap.css';
// get all the custom styles.
import './index.css';
import './PlayerContainer.css';
import './AudioPlayer.css';
import './Volume.css';

import PlayerContainer from './PlayerContainer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PlayerContainer />, document.getElementById('root'));
registerServiceWorker();
