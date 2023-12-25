import {
  ALL_COURSES_REQUEST_FAIL,
  ALL_COURSES_SUCCESS,
  ALL_COURSES_REQUEST,
} from "../Constants/Course";

export const getCourses = (
  state = { courses: [], noOfCourse: 0, loading: false },
  action
) => {
  switch (action.type) {
    case ALL_COURSES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_COURSES_SUCCESS:
      return {
        ...state,
        loading: false,
        noOfCourse: action?.payload?.length,
        courses: action.payload,
      };
    case ALL_COURSES_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        courses: null,
        error: action.payload,
        noOfCourse: 0,
      };
    default:
      return state;
  }
};
