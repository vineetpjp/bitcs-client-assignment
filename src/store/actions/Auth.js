import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ADD_USER,
} from "./Types";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import history from "../../history";
import { setAlert } from "./Alert";

//get user data
export const loadUser = () => async (dispatch) => {
  let userData;
  if (localStorage.user) {
    userData = JSON.parse(localStorage.user);
    setAuthToken(userData.jwtToken);
  }
  try {
    if (userData) {
      dispatch({ type: USER_LOADED, payload: userData });
    }
  } catch (err) {
    if (!localStorage?.user?.jwtToken) {
      dispatch({ type: AUTH_ERROR });
    }
  }
};

//register user
export const register = (formData) => async (dispatch) => {
  try {
    const response = await axios.post("user/signup", formData);
    setAuthToken(response?.data?.data?.jwtToken);
    setAlert(dispatch, "Registered Successfully", "success");
    console.log(response.data.data);
    dispatch({ type: LOGIN_SUCCESS, payload: response?.data?.data });
    history.push(`/trips`);
  } catch (err) {
    errorHandler(err, dispatch);
  }
};

//login user
export const login = (formData) => async (dispatch, getState) => {
  try {
    const response = await axios.post("user/login", formData);
    setAuthToken(response?.data?.data?.jwtToken);
    setAlert(dispatch, "LoggedIn Successfully", "success");
    dispatch({ type: LOGIN_SUCCESS, payload: response?.data?.data });
    history.push(`/trips`);
  } catch (err) {
    errorHandler(err, dispatch);
  }
};

//logout user
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  setAlert(dispatch, "loggedOut successfully", "success");
  history.push("/user/login");
};

//error handler

const errorHandler = (err, dispatch) => {
  const errors = err.response.data.errors;
  setAlert(dispatch, "Something went wrong!", "error");
  if (errors) {
    errors.forEach((err) => {
      setAlert(dispatch, err.msg, "error");
    });
  }
};
