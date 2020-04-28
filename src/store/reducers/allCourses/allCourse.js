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
  default:
   return state;
 }
}

export default allCourses;