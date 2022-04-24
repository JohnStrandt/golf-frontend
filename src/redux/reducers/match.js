import {
  FETCH_TODAYS_MATCH,
  START_RESUME_MATCH,
  SET_MATCH_READY,
  SCORE_HOLE,
  MATCH_NOT_FOUND,
  CLEAR_STATE
} from "../actions/types";

const initialState = {
  match_found: false,
  lineup_ready: false,
  match_ready: false,
  match: {},
  holes: {},
  team1: {},
  team2: {},
  subs1: {},
  subs2: {},
  error: null,
  loading: true
};

export const match = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_TODAYS_MATCH:
      return {
        ...state,
        match_found: true,
        lineup_ready: payload.cards_made,
        match: payload.match,
        team1: payload.team1,
        team2: payload.team2,
        subs1: payload.subs1,
        subs2: payload.subs2,
        loading: false,
        error: null
      };
    case START_RESUME_MATCH:
      return {
        ...state,
        // match: payload.match,
        holes: payload.holes,
        team1: payload.team1,
        team2: payload.team2,
        match_ready: true,
        loading: false,
        error: null
      };
    case MATCH_NOT_FOUND:
      return {
        ...state,
        match_found: false,
        error: payload,
        loading: false
      };
    case SET_MATCH_READY:
      return {
        ...state,
        match_ready: true
      };
    case SCORE_HOLE:
      return state;
    case CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
};

export default match;
