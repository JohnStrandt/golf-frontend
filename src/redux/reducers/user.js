
import {
  FETCH_PLAYERS
} from "../actions/types";

const initialState = {
  players: [],
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
