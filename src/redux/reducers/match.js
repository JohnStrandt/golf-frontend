import {
  FETCH_TODAYS_MATCH,
  FETCH_NEXT_MATCH,
  UPDATE_MATCH_TEAMS,
  GET_SCORECARDS,

  SET_LOADING,
  SET_MATCH_NOT_FOUND,
  SET_NO_MATCH_SCHEDULED,

  // state machine types
  NO_DATA,
  MATCH_FOUND,
  MATCH_NOT_FOUND,
  NEXT_MATCH_FOUND,
  NO_MATCH_SCHEDULED,
  PLAYERS_SELECTED,
  MATCH_UPDATED,
  SCORING,
  MATCH_OVER,

  SCORE_HOLE,
  AWARD_BONUS,
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
  loading: true,
  error: null,// not using yet
};

export const match = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_MATCH_NOT_FOUND:
      return {
        ...state,
        match_state: MATCH_NOT_FOUND,
        loading: false
      };
    case SET_NO_MATCH_SCHEDULED:
      return {
        ...state,
        match_state: NO_MATCH_SCHEDULED,
        loading: false
      };
    case MATCH_OVER:
      return {
        ...state,
        match_state: MATCH_OVER,
        loading: false
      };
    case PLAYERS_SELECTED:
      return {
        ...state,
        match_state: PLAYERS_SELECTED,
        loading: false
      };
    case SCORING:
      return {
        ...state,
        match_state: SCORING,
        loading: false
      };
    case FETCH_TODAYS_MATCH:
      let MATCH_STATE = MATCH_FOUND;
      if (payload.match.cards_made) MATCH_STATE = MATCH_UPDATED;
      return {
        ...state,
        match: payload.match,
        holes: payload.holes,
        starters1: payload.starters1,
        starters2: payload.starters2,
        subs1: payload.subs1,
        subs2: payload.subs2,
        match_state: MATCH_STATE,
        loading: false,
        error: null
      };
    case FETCH_NEXT_MATCH:
      return {
        ...state,
        match: payload.match,
        match_state: NEXT_MATCH_FOUND,
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
    case GET_SCORECARDS:
      return {
        ...state,
        cards1: payload.cards1,
        cards2: payload.cards2,
        handicap: payload.handicap,
        match_state: SCORING,
        loading: false,
        error: null
      };
    case SCORE_HOLE:
      return {
        ...state,
        match: payload.match,
        cards1: payload.cards1,
        cards2: payload.cards2,
        loading: false
      };
    case AWARD_BONUS:
      return {
        ...state,
        cards1: payload.cards1,
        cards2: payload.cards2,
        loading: false
      };
    case CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
};

export default match;
