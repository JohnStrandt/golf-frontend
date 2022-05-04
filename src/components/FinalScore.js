import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { awardBonus } from "../redux/actions/match";

import styled from "styled-components";


function FinalScore() {

  const {match, cards1, cards2 } = useSelector((state) => state.match);
  const event = match.event;
  const league = match.event.league;
  const course = match.event.course;

  // scorecards
  const team1 = cards1.team.name;
  const points1 = cards1.team.points;

  const team2 = cards2.team.name;
  const points2 = cards2.team.points;

  const dispatch = useDispatch();


  //                REFACTOR THIS SLOP

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
        {"id": ids1.team, "bonus": bonus1},
        {"id": ids2.team, "bonus": bonus2}
      ]

      const bonusPoints = JSON.stringify(data)
      dispatch(awardBonus(match.id, bonusPoints));

    }

  return (
    <Page>
      <Header>
        <h2>Final Score</h2>
        <h2>
          {league.name} {event.name}
        </h2>
        <h3>
          {course.name} {event.side_played}
        </h3>
        <h3 className="highlight">{match.name}</h3>
      
      </Header>
      
    </Page>
  )
}

const Page = styled.div`
  height: 100%;
  width: 100vw;

  background-color: var(--background);
  color: var(--text-primary);

  display: flex;
  flex-direction: column;
  align-items: center;

`;

const Header = styled.div`
  width: 100%;
  height: 35%;

  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;// hole number

  color: var(--text-hero);

  span{
    font-size: 2rem;
    color: var(--active)
  }

  h2{
    font-size: 1.5rem;
    font-weight: 300;
  }
}

`;


export default FinalScore