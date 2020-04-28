import { types } from './types';
import jsonServer from '../api/jsonServer';

export const authenticate = (authData, auth) => {
 return {
  type: types.LOGIN,
  authData: authData,
  auth: auth
 }
};

export const logOutUser = () => {
 return {
  type: types.LOGOUT_USER
 }
};

export const getUsers = (query) => {
 return async (dispatch) => {
  await jsonServer.get(`/${query}`)
   .then(function (response) {
    dispatch({
     type: types.USERS_DATA,
     data: response.data,
     success: true
    })
   })
 }
}

export const getAllCourses = () => {
 return async (dispatch) => {
  await jsonServer.get('/tutors')
   .then(function (response) {

    dispatch({
     type: types.GET_COURSES,
     courses: response.data,
     isSuccessful: true
    })
   })
 }
};