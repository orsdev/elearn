import { types } from '../../types';
import UserCourses from './userCourses';

describe('UserCourses Reducer', () => {
 test('Should return default state', () => {
  const userCourses = UserCourses(null, {});
  expect(userCourses).toEqual(null);
 });

 test('Should return new state if action.type(USERS_COURSES) is provided', () => {

  const state = {
   courses: [],
   isEmpty: true
  }

  const action = {
   type: types.USERS_DATA,
   courses: state.courses,
   isEmpty: state.isEmpty
  }

  const userCourses = UserCourses(state, action);
  expect(userCourses).toEqual(state);
 });

 test('Should return new state if action.type(LOGOUT_USER) is provided', () => {

  const state = {
   courses: null,
   isEmpty: false
  }

  const action = {
   type: types.LOGOUT_USER
  }

  const userCourses = UserCourses(state, action);
  expect(userCourses).toEqual(state);
 });

});