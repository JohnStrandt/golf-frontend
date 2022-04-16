import { combineReducers } from "redux";

import auth from "./auth";
import players from "./user";
import message from "./message";

export default combineReducers({
  auth,
  message,
  players
});
