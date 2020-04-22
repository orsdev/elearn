import { types } from '../../types';

const users = (state = { user: [], success: false }, action) => {
 switch (action.type) {
  case types.USERS_DATA:
   return {
    ...state,
    user: action.data,
    success: action.success
   };
  default:
   return state;
 }
};

export default users;