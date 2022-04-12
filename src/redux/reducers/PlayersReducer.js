
import {
  FETCH_PLAYERS
} from "../types";

const initState = {
  players: [],
  error: null,
  loading: true,

};

export const playersReducer = (state = initState, action) => {
  console.log(action.payload);
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
