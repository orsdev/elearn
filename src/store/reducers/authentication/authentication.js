import { types } from "../../types"

const initialState = {
 authData: null,
 auth: false
}

const authenticate = (state = initialState, action) => {
 switch (action.type) {
  case types.LOGIN:
   return {
    ...state,
    auth: action.auth,
    authData: action.authData
   };
  case types.LOGOUT_USER:
   return {
    ...state,
    auth: false,
    authData: null
   }
  default:
   return state;
 }

};

export default authenticate;