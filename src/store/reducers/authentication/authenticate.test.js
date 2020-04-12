import React from 'react';
import Authenticate from './authenticate';
import { types } from '../../types';

describe('Authenticate reducer', () => {

 test('Should return default state', () => {
  const authenticate = Authenticate(null, {});
  expect(authenticate).toEqual(null);
 });

 test('Should return new state if action.type(LOGIN_USER) is provided', () => {

  const user = {
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

  const newState = {
   type: types.LOGIN_USER,
   user: user.user
  }

  const authenticate = Authenticate(user, newState);
  expect(authenticate).toEqual(user);
 });

 test('Should return new state if action.type(LOGOUT_USER) is provided', () => {

  const user = {
   user: null,
   auth: false
  }

  const newState = {
   type: types.LOGOUT_USER
  }

  const authenticate = Authenticate(user, newState);
  expect(authenticate).toEqual(user);
 });

});