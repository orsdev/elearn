import { types } from '../../types';
import Users from './users';

describe('User Reducer', () => {
 test('Should return default state', () => {
  const user = Users(null, {});
  expect(user).toEqual(null);
 });

 test('Should return new state if action.type(USERS_DATA) is provided', () => {

  const state = {
   user: [],
   success: true
  }

  const action = {
   type: types.USERS_DATA,
   data: state.user,
   success: state.success
  }

  const user = Users(state, action);
  expect(user).toEqual(state);
 });

 test('Should return new state if action.type(LOGOUT_USER) is provided', () => {

  const state = {
   user: null,
   success: false
  }

  const action = {
   type: types.LOGOUT_USER
  }

  const user = Users(state, action);
  expect(user).toEqual(state);
 });

});