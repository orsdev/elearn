import React from 'react';
import studentAuthentication from './studentAuthentication';
import { types } from '../../types';

describe('studentAuthentication reducer', () => {

 test('Should return default state', () => {
  const authenticate = studentAuthentication(null, {});
  expect(authenticate).toEqual(null);
 });

 test('Should return new state if action.type(STUDENT_LOGIN) is provided', () => {

  const state = {
   studentData: {
    googleId: "",
    imageUrl: "",
    email: "",
    name: "",
    givenName: "",
    familyName: ""
   },
   studentAuth: true
  }

  const action = {
   type: types.STUDENT_LOGIN,
   studentData: state.studentData,
   studentAuth: state.studentAuth
  }

  const authenticate = studentAuthentication(state, action);
  expect(authenticate).toEqual(state);
 });

 test('Should return new state if action.type(LOGOUT_USER) is provided', () => {

  const state = {
   studentData: null,
   studentAuth: false
  }

  const action = {
   type: types.LOGOUT_USER
  }

  const authenticate = studentAuthentication(state, action);
  expect(authenticate).toEqual(state);
 });

});