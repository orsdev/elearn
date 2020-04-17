import React from 'react';
import Authenticate from './authenticate';
import { types } from '../../types';

describe('Authenticate reducer', () => {

 test('Should return default state', () => {
  const authenticate = Authenticate(null, {});
  expect(authenticate).toEqual(null);
 });

 test('Should return new state if action.type(LOGIN_USER) is provided', () => {

  const state = {
   user: {
    googleId: "",
    imageUrl: "",
    email: "",
    name: "",
    givenName: "",
    familyName: ""
   },
   auth: true
  }

  const action = {
   type: types.LOGIN_USER,
   user: state.user,
   auth: state.auth
  }

  const authenticate = Authenticate(state, action);
  expect(authenticate).toEqual(state);
 });

 test('Should return new state if action.type(LOGOUT_USER) is provided', () => {

  const state = {
   user: null,
   auth: false
  }

  const action = {
   type: types.LOGOUT_USER
  }

  const authenticate = Authenticate(state, action);
  expect(authenticate).toEqual(state);
 });

});