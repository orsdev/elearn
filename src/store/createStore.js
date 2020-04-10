import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import authenticate from './reducers/authentication/authenticate';

const combinedReducer = combineReducers({
 authenticate
});

const store = createStore(combinedReducer, applyMiddleware(ReduxThunk));

export default store;