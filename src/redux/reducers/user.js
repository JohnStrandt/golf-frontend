
import {
  FETCH_PLAYERS,
  FETCH_LEAGUE
} from "../actions/types";

const initialState = {
  league: {},
  players: [],
  league_loaded: false,
  players_loaded: false,
  error: null,
  loading: true,
};


export const user = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
  case FETCH_PLAYERS:
      return {
        ...state,
        players: payload.players,
        players_loaded: true,
        loading: false,
        error: null
      };
  case FETCH_LEAGUE:
      return {
        ...state,
        league: payload.league,
        league_loaded: true,
        loading: false,
        error: null
      };
    case "PLAYERS_ERROR":
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

export default user;
