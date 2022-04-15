import {
  FETCH_PLAYERS
} from "./types";

import axios from "axios";
import { playersURL } from "../../urls";


export const loadPlayers = (access) => async (dispatch) => {

  const config = {
    headers: {Authorization: `Bearer ${access}`}
  }

  const leagueData = await axios.get(playersURL, config);
  
  dispatch({
    type: FETCH_PLAYERS,
    payload: {
      players: leagueData.data,
    },
  });


  // .catch((e) => {

  //   console.log(e);

  //   dispatch({
  //     type: "PLAYERS_ERROR",
  //     payload: {
  //       error: {
  //         code: e.response.data.code,
  //         message: e.response.data.message,
  //       },
  //     },

  //   });
  // });

}