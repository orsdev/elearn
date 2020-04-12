import * as actions from './action';
import { types } from './types';

describe('action testing', () => {

 describe('Authenticate action', () => {

  test('Should return object', () => {

   const user = {
    type: types.LOGIN_USER,
    user: {}
   }

   const action = actions.logInUser({});
   expect(action).toEqual(user);
  });

 });
});