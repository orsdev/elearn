import { combineReducers } from 'redux';
import authenticate from './authentication/authenticate';
import playListId from './playListId/playListId';

const combinedReducer = combineReducers({
 authenticate,
 playListId
});

export default combinedReducer;