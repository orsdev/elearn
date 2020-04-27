import { combineReducers } from 'redux';
import authentication from './authentication/authentication';
import users from './users/users';

const combinedReducer = combineReducers({
 authentication,
 users
});

export default combinedReducer;