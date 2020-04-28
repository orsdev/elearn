import { types } from '../../types';
import allCourses from './allCourse';

describe('allCourses Reducer', () => {
 test('Should return default state', () => {
  const allcourses = allCourses(null, {});
  expect(allcourses).toEqual(null);
 });

 test('Should return new state if action.type(GET_COURSES) is provided', () => {

  const state = {
   courses: [],
   isSuccessful: true
  }

  const action = {
   type: types.GET_COURSES,
   courses: state.courses,
   isSuccessful: state.isSuccessful
  }

  const allcourses = allCourses(state, action);
  expect(allcourses).toEqual(state);
 });

});