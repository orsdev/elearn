import React from 'react';
import instructorAuthentication from './instructorAuthentication';
import { types } from '../../types';

describe('instructorAuthentication reducer', () => {

 test('Should return default state', () => {
  const authenticate = instructorAuthentication(null, {});
  expect(authenticate).toEqual(null);
 });

 test('Should return new state if action.type(INSTRUCTOR_LOGIN) is provided', () => {

  const state = {
   instructorData: {
    googleId: "",
    imageUrl: "",
    email: "",
    name: "",
    givenName: "",
    familyName: ""
   },
   instructorAuth: true
  }

  const action = {
   type: types.INSTRUCTOR_LOGIN,
   instructorData: state.instructorData,
   instructorAuth: state.instructorAuth
  }

  const authenticate = instructorAuthentication(state, action);
  expect(authenticate).toEqual(state);
 });

 test('Should return new state if action.type(LOGOUT_USER) is provided', () => {

  const state = {
   instructorData: null,
   instructorAuth: false
  }

  const action = {
   type: types.LOGOUT_USER
  }

  const authenticate = instructorAuthentication(state, action);
  expect(authenticate).toEqual(state);
 });

});