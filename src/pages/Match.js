import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import heroHole from "../images/heroHole.jpg";

import { getTodaysMatch, startResumeMatch } from "../redux/actions/match";
// import match from "../redux/reducers/match";



const Match = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();
  const {
    loading,
    lineup_ready,
    match_ready,
    matchID,
    match_found,
    rosters,
    match,
    holes,
    team1,
    team2
  } = useSelector((state) => state.match);


  useEffect(() => {
    if (!lineup_ready) dispatch(getTodaysMatch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (lineup_ready && match_found && !match_ready)
      dispatch(startResumeMatch(matchID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineup_ready]);


  // could put sections in Components folder, then conditionally render
  // SelectLineup, ScoreMatch, ShowScorecard
  // update current page only after cards updated

  return (
    <Page>

      {/* hdcp and Event need to get pulled out of match */}
      {/* hdcp needs to be its own Model */}

      {/* rosters data used for lineup */}
      {/* !lineup_ready && match_found needed here */}
      {/* drop match_ready  */}
      {!lineup_ready && match_ready &&
      <div>
        <p>{match.event.date}</p>
        <h2>{match.event.name}</h2>
        <h3>{match.name}</h3>
        <p>{match.event.course.name} {match.event.side_played}</p>
        <p>{match.hdcp.team} gets {match.hdcp.total_strokes} strokes</p>
      </div>
      }

      {match_ready &&
      <div>
        <p>{match.event.course.name} {match.event.side_played}</p>
        <p>hole {match.current_hole}</p>
        <br/>
        <p>hole {holes[match.current_hole].par}</p>
        <p>{holes[match.current_hole].yardage} yards</p>
        <p>hdcp {holes[match.current_hole].handicap}</p>
        <p>{match.hdcp.team} gets {match.hdcp.strokes[match.current_hole]} strokes</p>
      </div>
      }

      {/* <img src={baseURL+holes[match.current_hole].image} alt="profile pic" /> */}

      {/* team1, team2 for scoring */}

      <div>{!match_found && <p> no match today, foo</p>}</div>
    </Page>
  );
};

const Page = styled.div`
  background-color: var(--background);
  color: var(--text-primary);
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 5rem;
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
