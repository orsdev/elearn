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
    auth: true,
    user: action.user
   };
  default:
   return state;
 }

};

export default authenticate;