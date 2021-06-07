import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actions/Types";

const INITIAL_STATE = {
  token: "", //todo what to do with token in reducerState
  isAuthenticated: null,
  loading: true,
  user: null,
};

export const auth = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        loading: false,
        token: payload.jwtToken,
        isAuthenticated: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        user: payload,
        token: payload.jwtToken,
        loading: false,
        isAuthenticated: true,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("user");
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        token: null,
        user: null,
      };

    default:
      return state;
  }
};
