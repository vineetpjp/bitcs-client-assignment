import { SET_ALERT, REMOVE_ALERT } from "./Types";
import { v4 } from "uuid";

export const setAlert = (dispatch, msg, alertType, time = 3000) => {
  const Id = v4();
  dispatch({ type: SET_ALERT, payload: { msg, alertType, Id } });
  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: { Id } });
  }, time);
};

export const setAlertAction =
  (msg, alertType, time = 3000) =>
  (dispatch) => {
    const Id = v4();
    dispatch({ type: SET_ALERT, payload: { msg, alertType, Id } });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: { Id } });
    }, time);
  };
