import * as actions from './action';
import { types } from './types';

describe('action testing', () => {

 describe('studentLogIn action', () => {

  test('studentLogIn action should return object', () => {

   const user = {
    type: types.STUDENT_LOGIN,
    studentData: {},
    studentAuth: true
   }

   const action = actions.studentLogIn({}, true);
   expect(action).toEqual(user);
  });
 });

 describe('instructorLogIn action', () => {

  test('instructorLogIn action should return object', () => {

   const user = {
    type: types.INSTRUCTOR_LOGIN,
    instructorData: {},
    instructorAuth: true
   }

   const action = actions.instructorLogIn({}, true);
   expect(action).toEqual(user);
  });
 });

 test('logOutUser action should return object', () => {

  const user = {
   type: types.LOGOUT_USER,
  }

  const action = actions.logOutUser();
  expect(action).toEqual(user);
 });

});