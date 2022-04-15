
import {
  FETCH_PLAYERS
} from "../actions/types";

const initState = {
  players: [],
  error: null,
  loading: true,

};

export const players = (state = initState, action) => {
  
  switch (action.type) {
  case FETCH_PLAYERS:
      return {
        ...state,
        players: action.payload.players,
        loading: false,
        error: null
      };
    case "PLAYERS_ERROR":
      return {
        ...state,
        error: action.payload.error
      };
    case "CLEAR_STATE":
      return initState;
    default:
      return state;
  }
};

export default players;