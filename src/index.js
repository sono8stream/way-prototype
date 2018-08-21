import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Routes from './routes';
import registerServiceWorker from './utils/registerServiceWorker';

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
