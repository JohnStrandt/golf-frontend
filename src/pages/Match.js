import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import heroHole from "../images/heroHole.jpg";

import {
  NO_DATA,
  MATCH_FOUND,
  PLAYERS_SELECTED,
  MATCH_UPDATED,
  CARDS_READY,
} from "../redux/actions/types";

import { 
  getTodaysMatch, 
  updateMatchTeams, 
  makeScorecards 
} from "../redux/actions/match";

import { SelectPlayers } from "../components";

const Match = () => {
  const {
    loading,
    match_state,
    match,
    holes,
  } = useSelector((state) => state.match);

  const { message } = useSelector((state) => state.message);
  const [teamOnePlayers, setTeamOnePlayers] = useState({});
  const [teamTwoPlayers, setTeamTwoPlayers] = useState({});

  const dispatch = useDispatch();
  

  useEffect(() => {   //  STATE MACHINE

    if (match_state === NO_DATA) {
      dispatch(getTodaysMatch());
    
    }else if (match_state === PLAYERS_SELECTED) {
      dispatch(updateMatchTeams(match.id, teamOnePlayers, teamTwoPlayers));
    
    }else if (match_state === MATCH_UPDATED) {
      dispatch(makeScorecards(match.id, match.team1, match.team2))

    }else if (match_state === CARDS_READY) {
      console.log("LET'S PLAY")
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match_state])



  return (
    <Page>

      {match_state === NO_DATA && message && <p>{message}</p>}

      {match_state === MATCH_FOUND && (
        <SelectPlayers 
        setTeamOnePlayers = {setTeamOnePlayers}
        setTeamTwoPlayers = {setTeamTwoPlayers}
        />
      )}

      {match_state === MATCH_UPDATED && (
        <>
          <p>MATCH UPDATED</p>
        </>
      )}

      {match_state === CARDS_READY && (
        <div>
          <p>
            {match.event.course.name} {match.event.side_played}
          </p>
          <p>hole {match.current_hole}</p>
          <br />
          <p>hole {holes[match.current_hole].par}</p>
          <p>{holes[match.current_hole].yardage} yards</p>
          <p>hdcp {holes[match.current_hole].handicap}</p>
        </div>
      )}
    </Page>
  );
};

const Page = styled.div`
  height: 100%;

  background-color: var(--background);
  color: var(--text-primary);

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 4rem;
`;

const Header = styled.div`
  background: url(${heroHole}) no-repeat center;
  background-size: fit;
  width: 100vw;
  height: 25vh;
  max-height: 250px;
  margin-bottom: 4px;

  h1 {
    margin-top: 1rem;
    text-align: center;
    color: var(--text-hero);
    font-size: 1.8rem;
    font-weight: 500;
  }
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  background-color: var(--card-bg);

  width: min(100%, 550px);
  height: auto;

  margin: 2px 0;
  padding: 0.5rem;

  overflow: hidden;
`;

const ProfilePic = styled.img`
  border-radius: 50%;
  border: 1px solid var(--background);
  object-fit: cover;
  height: 4rem;
  width: 4rem;
`;

const ProfileName = styled.p`
  font-size: 1rem;
  font-weight: 400;
`;

export default Match;
