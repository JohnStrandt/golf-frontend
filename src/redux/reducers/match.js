
import {
  FETCH_TODAYS_MATCH, START_RESUME_MATCH } from "../actions/types";

const initialState = {
  lineup_ready: false,
  match_ready: false,
  matchID: null,
  rosters: {},
  match: {},
  holes: {},
  team1: {},
  team2: {},
  error: null,
  loading: true,
};


export const match = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_TODAYS_MATCH:
        return {
          ...state,
          lineup_ready: payload.cards_made,
          matchID: payload.matchID,
          rosters: payload.rosters,
          loading: false,
          error: null
        };
    case START_RESUME_MATCH:
        return {
          ...state,
          match: payload.match,
          holes: payload.holes,
          team1: payload.team1,
          team2: payload.team2,
          match_ready: true,
          loading: false,
          error: null
        };
    case "MATCH_ERROR":
      return {
        ...state,
        error: payload.error
      };
    case "CLEAR_STATE":
      return initialState;
    default:
      return state;
  }
};

export default match;
