import { combineReducers } from 'redux';
import authenticate from './authentication/authenticate';
import playListId from './playListId/playListId';
import playListItems from './playListItems/playListItems';
import users from './users/users';

const combinedReducer = combineReducers({
 authenticate,
 playListId,
 playListItems,
 users
});

export default combinedReducer;