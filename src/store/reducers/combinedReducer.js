import { combineReducers } from 'redux';
import allCourses from './allCourses/allCourse';
import authentication from './authentication/authentication';
import userCourses from './userCourses/userCourses';
import users from './users/users';

const combinedReducer = combineReducers({
 authentication,
 allCourses,
 users,
 userCourses
});

export default combinedReducer;