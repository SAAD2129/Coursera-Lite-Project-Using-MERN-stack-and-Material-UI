import {
  GET_USER_REQUEST,
  GET_USER_REQUEST_FAIL,
  GET_USER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
} from "../Constants/Auth";

export const userInfo = (
  state = { user: {}, isAuthenticated: false, loading: false },
  action
) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case GET_USER_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: {},
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: {},
      };
    case LOGOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
      };
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: true,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user:{}
      };
    default:
      return state;
  }
};
