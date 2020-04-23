import { types } from "../../types"

const initialState = {
 studentData: null,
 studentAuth: false
}

const studentAuthenticate = (state = initialState, action) => {
 switch (action.type) {
  case types.STUDENT_LOGIN:
   return {
    ...state,
    studentAuth: action.studentAuth,
    studentData: action.studentData
   };
  case types.LOGOUT_USER:
   return {
    ...state,
    studentAuth: false,
    studentData: null
   }
  default:
   return state;
 }

};

export default studentAuthenticate;