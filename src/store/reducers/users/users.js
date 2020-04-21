import { types } from '../../types';

const users = (state = null, action) => {
 switch (action.type) {
  case types.USERS_DATA:
   return action.data;
  default:
   return state;
 }
};

export default users;