import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import combinedReducer from './reducers/combinedReducer.js';


const store = createStore(combinedReducer, applyMiddleware(ReduxThunk));

export default store;