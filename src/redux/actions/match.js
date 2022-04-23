import {
  FETCH_TODAYS_MATCH,
  START_RESUME_MATCH,
  SET_MESSAGE,
  MATCH_NOT_FOUND,
  SCORE_HOLE
} from "./types";
import MatchService from "../services/matchService";


export const getTodaysMatch = () => (dispatch) => {

  return MatchService.getTodaysMatch().then(
    (data) => {
      dispatch({
        type: FETCH_TODAYS_MATCH,
        payload: {
          match: data.match,
          team1: data.team1,
          team2: data.team2,
          subs1: data.subs1,
          subs2: data.subs2,
          cards_made: data.match.cards_made,
        }
      });
      return Promise.resolve();
    },
    (error) => {
      const message = "Sorry, no match found for today";
      dispatch({
        type: MATCH_NOT_FOUND,
        payload: error
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message
      });
      return Promise.reject();
    }
  )
};

export const startResumeMatch = (id) => (dispatch) => {
  return MatchService.startResumeMatch(id).then(
    (data) => {

      dispatch({
        type: START_RESUME_MATCH,
        payload: {
          // match: data.match,
          holes: data.holes,
          team1: data.team1,
          team2: data.team2
        }
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
      return Promise.reject();
    }
  );
};


export const scoreHole = (body) => (dispatch) => {
  return MatchService.scoreHole(body).then(
    (data) => {

      dispatch({
        type: SCORE_HOLE
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
      return Promise.reject();
    }
  );
};