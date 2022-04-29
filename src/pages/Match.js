import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";


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
  getScorecards 
} from "../redux/actions/match";

import { SelectPlayers, ScoreMatch } from "../components";

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
      dispatch(getScorecards(match.id, match.team1, match.team2))

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match_state])



  return (
    <Page>

      {/* need a next/no match page here */}
      {match_state === NO_DATA && message && <p>{message}</p>}

      {match_state === MATCH_FOUND && (
        <SelectPlayers 
        setTeamOnePlayers = {setTeamOnePlayers}
        setTeamTwoPlayers = {setTeamTwoPlayers}
        />
      )}

      {match_state === CARDS_READY && (
        <ScoreMatch /> 
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

export default Match;
