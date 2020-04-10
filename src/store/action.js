import { types } from './types';

export const getUser = (user) => {
 return {
  type: types.USER,
  user: user
 }
};