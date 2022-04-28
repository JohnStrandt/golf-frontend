import {
  FETCH_TODAYS_MATCH,
  UPDATE_MATCH_TEAMS,
  MAKE_SCORECARDS,

  NO_DATA,
  MATCH_FOUND,
  PLAYERS_SELECTED,
  MATCH_UPDATED,
  CARDS_READY,

  SCORE_HOLE,
  CLEAR_STATE
} from "../actions/types";

const initialState = {
  match_state: NO_DATA,
  match: {},
  holes: {},
  starters1: {},
  starters2: {},
  subs1: {},
  subs2: {},
  error: null,
  loading: true
};

export const match = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PLAYERS_SELECTED:
      return {
        ...state,
        match_state: PLAYERS_SELECTED
      };
    case CARDS_READY:
      return {
        ...state,
        match_state: CARDS_READY
      };
    case FETCH_TODAYS_MATCH:
      return {
        ...state,
        match: payload.match,
        holes: payload.holes,
        starters1: payload.starters1,
        starters2: payload.starters2,
        subs1: payload.subs1,
        subs2: payload.subs2,
        match_state: MATCH_FOUND,
        loading: false,
        error: null
      };
    case UPDATE_MATCH_TEAMS:
      return {
        ...state,
        match: payload.match,
        match_state: MATCH_UPDATED,
        loading: false,
        error: null
      };
    case MAKE_SCORECARDS:
      console.log(payload);
      return {
        ...state,
        // match_state: CARDS_READY,
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
