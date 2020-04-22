import { types } from "../../types"

const initialState = {
 userData: null,
 loggedIn: false
}

const authenticate = (state = initialState, action) => {
 switch (action.type) {
  case types.LOGIN_USER:
   return {
    ...state,
    loggedIn: action.loggedIn,
    userData: action.userData
   };
  case types.LOGOUT_USER:
   return {
    ...state,
    loggedIn: false,
    userData: null
   }
  default:
   return state;
 }

};

export default authenticate;