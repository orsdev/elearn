import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/createStore';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

const app = (
 <Provider store={store}>
  <Router>
   <App />
  </Router>
 </Provider>
);


ReactDOM.render(app,
 document.getElementById('root')
);

serviceWorker.unregister();
