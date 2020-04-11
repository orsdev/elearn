import { combineReducers, applyMiddleware } from 'redux';
import authenticate from './authentication/authenticate';

const combinedReducer = combineReducers({
 authenticate
});

export default combinedReducer;