import { types } from '../../types';

const initialState = {
 courses: null,
 isSuccessful: false
};

const allCourses = (state = initialState, action) => {
 switch (action.type) {
  case types.GET_COURSES:
   return {
    ...state,
    courses: action.courses,
    isSuccessful: action.isSuccessful
   };
  case types.LOGOUT_USER:
   return {
    ...state,
    courses: null,
    isSuccessful: false
   }
  default:
   return state;
 }
}

export default allCourses;