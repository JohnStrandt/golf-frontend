import {
  FETCH_LEAGUE,
  FETCH_PLAYERS,
  SET_MESSAGE,
} from "./types";
import UserService from "../services/userService";


export const getPlayers = () => (dispatch) => {

  return UserService.getPlayers().then(
    (data) => {
      dispatch({
        type: FETCH_PLAYERS,
        payload: { players: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // dispatch({
      //   type: NO_TYPE_MADE_YET,
      // });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      console.error(error);
      return Promise.reject();
    }
  );
};


export const getLeague = () => (dispatch) => {

  return UserService.getLeague().then(
    (data) => {
      dispatch({
        type: FETCH_LEAGUE,
        payload: { league: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // dispatch({
      //   type: LOGIN_FAIL,
      // });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      console.error(error);
      return Promise.reject();
    }
  );
};
