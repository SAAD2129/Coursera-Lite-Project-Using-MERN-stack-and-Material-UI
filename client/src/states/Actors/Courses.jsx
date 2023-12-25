import {
  ALL_COURSES_SUCCESS,
  ALL_COURSES_REQUEST,
  ALL_COURSES_REQUEST_FAIL,
} from "../Constants/Course";
import axios from "axios";

export const fetchCourses = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_COURSES_REQUEST });
    const { data } = await axios.get("http://localhost:5000/api/v2/courses");
    if (data.success) {
      dispatch({ type: ALL_COURSES_SUCCESS, payload: data.courses });
    } else dispatch({ type: ALL_COURSES_REQUEST_FAIL });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: ALL_COURSES_REQUEST_FAIL, payload: error });
  }
};
