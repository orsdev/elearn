import { combineReducers } from 'redux';
import allCourses from './allCourses/allCourse';
import authentication from './authentication/authentication';
import users from './users/users';

const combinedReducer = combineReducers({
 authentication,
 allCourses,
 users
});

export default combinedReducer;