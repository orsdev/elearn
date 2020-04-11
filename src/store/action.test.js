import * as actions from './action';
import { types } from './types';

describe('action testing', () => {

 describe('Authenticate action', () => {

  test('Should return object', () => {

   const user = {
    type: types.USER,
    user: {}
   }

   const action = actions.getUser({});
   expect(action).toEqual(user);
  });

 });
});