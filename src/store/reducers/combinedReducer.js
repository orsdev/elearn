import { combineReducers } from 'redux';
import studentAuthentication from './authentication/studentAuthentication';
import instructorAuthentication from './authentication/instructorAuthentication';
import playListId from './playListId/playListId';
import playListItems from './playListItems/playListItems';
import users from './users/users';

const combinedReducer = combineReducers({
 studentAuthentication,
 instructorAuthentication,
 playListId,
 playListItems,
 users
});

export default combinedReducer;