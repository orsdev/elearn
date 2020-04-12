import * as actions from './action';
import { types } from './types';

describe('action testing', () => {

 describe('Authenticate action', () => {

  test('logInUser action should return object', () => {

   const user = {
    type: types.LOGIN_USER,
    user: {}
   }

   const action = actions.logInUser({});
   expect(action).toEqual(user);
  });

  test('logOutUser action should return object', () => {

   const user = {
    type: types.LOGOUT_USER,
   }

   const action = actions.logOutUser();
   expect(action).toEqual(user);
  });

 });
});