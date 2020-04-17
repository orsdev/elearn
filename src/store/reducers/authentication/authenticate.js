import { types } from "../../types"

const initialState = {
 user: null,
 auth: false
}

const authenticate = (state = initialState, action) => {
 switch (action.type) {
  case types.LOGIN_USER:
   return {
    ...state,
    auth: action.auth,
    user: action.user
   };
  case types.LOGOUT_USER:
   return {
    ...state,
    auth: false,
    user: null
   }
  default:
   return state;
 }

};

export default authenticate;