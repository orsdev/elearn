import { types } from '../../types';

const initialState = {
 courses: null,
 isEmpty: false
};

const userCourses = (state = initialState, action) => {
 switch (action.type) {
  case types.USER_COURSES:
   return {
    ...state,
    courses: action.courses,
    isEmpty: action.isEmpty
   };
  default:
   return state;
 }
}

export default userCourses;