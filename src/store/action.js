import { types } from './types';

export const logInUser = (user) => {
 return {
  type: types.LOGIN_USER,
  user: user
 }
};