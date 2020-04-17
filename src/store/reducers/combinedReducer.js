import { combineReducers } from 'redux';
import authenticate from './authentication/authenticate';
import playListId from './playListId/playListId';
import playListItems from './playListItems/playListItems';

const combinedReducer = combineReducers({
 authenticate,
 playListId,
 playListItems
});

export default combinedReducer;