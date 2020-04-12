import { types } from './types';

export const getUser = (user) => {
 return {
  type: types.LOGIN_USER,
  user: user
 }
};