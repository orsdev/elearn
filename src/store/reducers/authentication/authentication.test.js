import React from 'react';
import { types } from '../../types';
import authentication from './authentication';

describe('Authentication Reducer', () => {
 test('Should return default state', () => {
  const authenticate = authentication(null, {});
  expect(authenticate).toEqual(null);
 });

 test('Should return new state if action.type(LOGIN) is provided', () => {

  const state = {
   authData: {
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
   type: types.LOGIN,
   authData: state.authData,
   auth: state.auth
  }

  const authenticate = authentication(state, action);
  expect(authenticate).toEqual(state);
 });

 test('Should return new state if action.type(LOGOUT_USER) is provided', () => {

  const state = {
   authData: null,
   auth: false
  }

  const action = {
   type: types.LOGOUT_USER
  }

  const authenticate = authentication(state, action);
  expect(authenticate).toEqual(state);
 });

});