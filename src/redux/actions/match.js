import {
  SET_MESSAGE,
  FETCH_TODAYS_MATCH,
  SET_MATCH_NOT_FOUND,
  FETCH_NEXT_MATCH,
  SET_NO_MATCH_SCHEDULED,
  UPDATE_MATCH_TEAMS,
  GET_SCORECARDS,
  SCORE_HOLE,
  AWARD_BONUS
} from "./types";
import MatchService from "../services/matchService";


export const getTodaysMatch = () => (dispatch) => {

  return MatchService.getTodaysMatch().then(
    (data) => {
      dispatch({
        type: FETCH_TODAYS_MATCH,
        payload: {
          match: data.match,
          holes: data.holes,
          starters1: data.starters1,
          starters2: data.starters2,
          subs1: data.subs1,
          subs2: data.subs2,
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
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      dispatch({
        type: SET_MATCH_NOT_FOUND,
      });
      return Promise.reject();
    }
  );
};


export const getNextMatch = () => (dispatch) => {

  return MatchService.getNextMatch().then(
    (data) => {

      dispatch({
        type: FETCH_NEXT_MATCH,
        payload: {
          match: data,
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
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      dispatch({
        type: SET_NO_MATCH_SCHEDULED,
      });
      return Promise.reject();
    }
  );
};


export const updateMatchTeams = (id, teamOne, teamTwo) => (dispatch) => {

  return MatchService.updateMatchTeams(id, teamOne, teamTwo).then(
    (data) => {
      dispatch({
        type: UPDATE_MATCH_TEAMS,
        payload: {
          match: data,
        }
      });
      return Promise.resolve();
    },
    (error) => {
      const message = "Update failed";
      dispatch({
        type: SET_MESSAGE,
        payload: message
      });
      return Promise.reject();
    }
  );
};


export const getScorecards = (id, teamOne, teamTwo) => (dispatch) => {

  return MatchService.getScorecards(id, teamOne, teamTwo).then(
    (data) => {
      dispatch({
        type: GET_SCORECARDS,
        payload: {
          cards1: data.cards1,
          cards2: data.cards2,
          handicap: data.handicap
        }
      });
      return Promise.resolve();
    },
    (error) => {
      const message = "Error while making scorecards";
      dispatch({
        type: SET_MESSAGE,
        payload: message
      });
      return Promise.reject();
    }
  );
};


export const scoreHole = (id, holeScores) => (dispatch) => {
  return MatchService.scoreHole(id, holeScores).then(
    (data) => {

      dispatch({
        type: SCORE_HOLE,
        payload: {
          match: data.match,
          cards1: data.cards1,
          cards2: data.cards2
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
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};


export const awardBonus = (id, bonusPoints) => (dispatch) => {
  return MatchService.awardBonus(id, bonusPoints).then(
    (data) => {

      dispatch({
        type: AWARD_BONUS,
        payload: {
          cards1: data.cards1,
          cards2: data.cards2
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
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};