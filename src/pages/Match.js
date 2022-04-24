import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import heroHole from "../images/heroHole.jpg";

import { getTodaysMatch, startResumeMatch } from "../redux/actions/match";
import { getLeague } from "../redux/actions/user";

import { SelectPlayers } from "../components"



const Match = () => {

  
  const {
    loading,
    lineup_ready,
    match_ready,
    matchID,
    match_found,
    match,
    holes,
    team1,
    team2,
    subs1,
    subs2
  } = useSelector((state) => state.match);
  const { message } = useSelector((state) => state.message);
  const { league, league_loaded } = useSelector((state) => state.user);
  let event, course, current_hole;

  const dispatch = useDispatch();

  if (match_found){
    event = match.event;
    course = match.event.course;
    current_hole = match.current_hole;
  }

  useEffect(() => {
    if (!league_loaded) dispatch(getLeague());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!match_found) {
      dispatch(getTodaysMatch())
      .catch((e) => console.error(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (match_found && lineup_ready) dispatch(startResumeMatch(matchID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineup_ready]);



  return (
    <Page>

      <div>{!match_found && message && <p>{message}</p>}</div>

      {match_found && !lineup_ready && <SelectPlayers /> }

      {match_found && lineup_ready &&

      // confirm lineup before starting? go back button?
      <div>
        <p>{event.date}</p>
        <h2>{event.name}</h2>
        <h3>{match.name}</h3>
        <p>{course.name} {event.side_played}</p>
      </div>
      }


      {match_ready &&
      <div>
        <p>{course.name} {event.side_played}</p>
        <p>hole {current_hole}</p>
        <br/>
        <p>hole {holes[current_hole].par}</p>
        <p>{holes[current_hole].yardage} yards</p>
        <p>hdcp {holes[current_hole].handicap}</p>

      </div>
      }

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
