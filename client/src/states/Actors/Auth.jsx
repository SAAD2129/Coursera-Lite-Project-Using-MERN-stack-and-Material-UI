import axios from "axios";
import {
  GET_USER_REQUEST,
  GET_USER_REQUEST_FAIL,
  GET_USER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
} from "../Constants/Auth";
import { toast } from "react-toastify";

export const getUserInfo = () => async (dispatch) => {
  try {
    if (!localStorage.getItem("auth-token"))
      return dispatch({ type: LOGOUT_USER_SUCCESS });
    dispatch({ type: GET_USER_REQUEST });
    const response = await fetch("http://localhost:5000/api/v1/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("auth-token"),
      },
    });
    const data = await response.json();
    if (data.success) dispatch({ type: GET_USER_SUCCESS, payload: data.user });
    else dispatch({ type: GET_USER_REQUEST_FAIL });
  } catch (error) {
    dispatch({ type: GET_USER_REQUEST_FAIL, payload: error });
  }
};

export const loginUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST, payload: {} });
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      user
    );
    if (data.success) {
      dispatch({ type: LOGIN_REQUEST_SUCCESS, payload: data.user });
      localStorage.setItem("auth-token", data.token);
      toast.success(data.message);
    } else dispatch({ type: LOGIN_REQUEST_FAIL });
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: LOGIN_REQUEST_FAIL, payload: error });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_USER_REQUEST });
    const { data } = await axios.get(
      "http://localhost:5000/api/v1/auth/logout"
    );
    if (data.success) {
      dispatch({ type: LOGOUT_USER_SUCCESS, payload: data.user });
      localStorage.removeItem("auth-token");
      toast.success(data.message);
    } else {
      toast.error(data.message);
      dispatch({ type: LOGOUT_USER_FAIL });
    }
  } catch (error) {
    dispatch({ type: LOGIN_REQUEST_FAIL, payload: error });
  }
};
