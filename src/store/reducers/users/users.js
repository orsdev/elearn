import { types } from '../../types';

const users = (state = { user: [], success: false }, action) => {
 switch (action.type) {
  case types.USERS_DATA:
   return {
    ...state,
    user: action.data,
    success: action.success
   };
  case types.LOGOUT_USER:
   return {
    user: null,
    success: false
   }
  default:
   return state;
 }
};

export default users;