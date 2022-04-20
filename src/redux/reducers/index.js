import { combineReducers } from "redux";

import auth from "./auth";
import user from "./user";
import match from "./match";
import message from "./message";

export default combineReducers({
  auth,
  user,
  match,
  message
});
