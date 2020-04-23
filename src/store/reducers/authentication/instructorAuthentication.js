import { types } from "../../types"

const initialState = {
 instructorData: null,
 instructorAuth: false
}

const instructorAuthentication = (state = initialState, action) => {
 switch (action.type) {
  case types.INSTRUCTOR_LOGIN:
   return {
    ...state,
    instructorAuth: action.instructorAuth,
    instructorData: action.instructorData
   };
  case types.LOGOUT_USER:
   return {
    ...state,
    instructorAuth: false,
    instructorData: null
   }
  default:
   return state;
 }

};

export default instructorAuthentication;