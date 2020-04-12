import { types } from './types';

export const logInUser = (user) => {
 return {
  type: types.LOGIN_USER,
  user: user
 }
};

export const logOutUser = () => {
 return {
  type: types.LOGOUT_USER
 }
};