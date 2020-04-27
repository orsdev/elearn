import * as actions from './action';
import { types } from './types';

describe('action testing', () => {

 describe('authenticate action', () => {

  test('should return object', () => {

   const user = {
    type: types.LOGIN,
    authData: {},
    auth: true
   }

   const action = actions.authenticate({}, true);
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