import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import {
  NO_DATA,
  MATCH_FOUND,
  MATCH_NOT_FOUND,
  NEXT_MATCH_FOUND,
  NO_MATCH_SCHEDULED,
  PLAYERS_SELECTED,
  MATCH_UPDATED,
  SCORING,
  MATCH_OVER
} from "../redux/actions/types";

import {
  getTodaysMatch,
  getNextMatch,
  updateMatchTeams,
  getScorecards
} from "../redux/actions/match";

import { UpcomingMatches, SelectPlayers, ScoreMatch, FinalScore } from "../components";



const Match = () => {


  const { loading, match_state, match } = useSelector(
    (state) => state.match
  );

  const { message } = useSelector((state) => state.message);
  const [teamOnePlayers, setTeamOnePlayers] = useState({});
  const [teamTwoPlayers, setTeamTwoPlayers] = useState({});
  
  const dispatch = useDispatch();

  let side_played = '';
  if (match.event) side_played = match.event.side_played;

  let last_hole = 18;
  if (side_played === "Front") last_hole = 9;


  useEffect(() => {
    //                    STATE MACHINE

    if (match_state === NO_DATA) {
      dispatch(getTodaysMatch())
    } else if (match_state === MATCH_NOT_FOUND) {
      dispatch(getNextMatch());
    } else if (match_state === PLAYERS_SELECTED) {
      dispatch(updateMatchTeams(match.id, teamOnePlayers, teamTwoPlayers));
    } else if (match_state === MATCH_UPDATED) {
      dispatch(getScorecards(match.id, match.team1, match.team2));
    } else {
      console.log("Some other State");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match_state]);

  // match.current_hole && ...
  if (match_state === SCORING && match.current_hole > last_hole)
      dispatch({type: MATCH_OVER});



  return (
  
    <Page>

    {loading ? (
      <div>
          <p>loading...</p>
      </div>
      
    ) : (

      <>

      {/* simplify to MATCH_NOT_FOUND or NO_MATCH_TODAY? */}
      {(match_state === NEXT_MATCH_FOUND || match_state === NO_MATCH_SCHEDULED) && (
        <UpcomingMatches />
      )}

      {match_state === MATCH_FOUND && (
        <SelectPlayers
        setTeamOnePlayers={setTeamOnePlayers}
        setTeamTwoPlayers={setTeamTwoPlayers}
        />
      )}

      {match_state === SCORING && <ScoreMatch />}

      {match_state === MATCH_OVER && <FinalScore />}

      </>

    )}

    </Page>

  )


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
