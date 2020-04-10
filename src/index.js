import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/createStore';
import * as serviceWorker from './serviceWorker';

const app = (
 <Provider store={store}>
  <App />
 </Provider>
);


ReactDOM.render(app,
 document.getElementById('root')
);

serviceWorker.unregister();
