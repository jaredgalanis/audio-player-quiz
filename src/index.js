import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import PlayerContainer from './PlayerContainer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PlayerContainer />, document.getElementById('root'));
registerServiceWorker();
