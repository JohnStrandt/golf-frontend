import React from 'react'
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

//  match, holes, cards1, cards2, handicap
//  scores dictionaries
//  cards1.team.scores, cards1.players[0].scores

const ScoreMatch = () => {

  const {
    loading,
    match,
    holes,
  } = useSelector((state) => state.match);

  return (
    <Page>
      <p>
        {match.event.course.name} {match.event.side_played}
      </p>
      <p>index {match.current_hole}</p>
      <br />
      <p>hole {holes[match.current_hole].number}</p>
      <p>par {holes[match.current_hole].par}</p>
      <p>{holes[match.current_hole].yardage} yards</p>
      <p>hdcp {holes[match.current_hole].handicap}</p>
    </Page>
  )
}

const Page = styled.div`
  height: 100%;

  background-color: var(--background);
  color: var(--text-primary);

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 4rem;
`;

export default ScoreMatch