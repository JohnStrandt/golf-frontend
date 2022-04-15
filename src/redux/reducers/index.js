import { combineReducers } from "redux";

import auth from "./auth";
import players from "./players";
import message from "./message";

export default combineReducers({
  auth,
  message,
  players
});
