import { combineReducers } from "redux";
import { auth } from "./Auth";
import alerts from "./Alert";

export const rootReducer = combineReducers({
  auth,
  alerts,
});
