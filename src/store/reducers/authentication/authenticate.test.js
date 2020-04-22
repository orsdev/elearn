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
   userData: {
    googleId: "",
    imageUrl: "",
    email: "",
    name: "",
    givenName: "",
    familyName: ""
   },
   loggedIn: true
  }

  const action = {
   type: types.LOGIN_USER,
   userData: state.userData,
   loggedIn: state.loggedIn
  }

  const authenticate = Authenticate(state, action);
  expect(authenticate).toEqual(state);
 });

 test('Should return new state if action.type(LOGOUT_USER) is provided', () => {

  const state = {
   userData: null,
   loggedIn: false
  }

  const action = {
   type: types.LOGOUT_USER
  }

  const authenticate = Authenticate(state, action);
  expect(authenticate).toEqual(state);
 });

});