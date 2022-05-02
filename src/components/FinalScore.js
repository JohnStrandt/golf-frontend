import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { awardBonus } from "../redux/actions/match";

// import styled from "styled-components";


function FinalScore() {

  const { cards1, cards2 } = useSelector((state) => state.match);

  const dispatch = useDispatch();


  //          REFACTOR THIS SLOP

  const ids1 = {
    "team": cards1.team.id,
    "players": [cards1.players[0].id, cards1.players[1].id]
  }

  const ids2 = {
    "team": cards2.team.id,
    "players": [cards2.players[0].id, cards2.players[1].id]
  }

  const player_ids = [...ids1.players, ...ids2.players]

  useEffect(() =>{

    bonusPoints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  //  MATCH WIN, LOSE, OR DRAW... AWARD BONUS POINTS
  const bonusPoints = () => {

      // gotta send player ids along for the ride
      let data = {};
      data["player_cards"] = [];

      player_ids.forEach(id => {
        data["player_cards"].push({"id": id,});
      });


      // NOW, CALCULATE TEAM BONUS POINTS
      let bonus1 = 0;
      let bonus2 = 0;
      
      if (cards1.team.points > cards2.team.points) bonus1 = 2;
      else if (cards1.team.points < cards2.team.points) bonus2 = 2;
      else {
        bonus1 = 1;
        bonus2 = 1
      }

      data["team_cards"] = [
        {"id": ids1.team, "points": bonus1},
        {"id": ids2.team, "points": bonus2}
      ]

      const bonusPoints = JSON.stringify(data)
      dispatch(awardBonus(bonusPoints));

    }

  return (
    <div>FinalScore</div>
  )
}

export default FinalScore