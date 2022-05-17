import React from 'react'
import { useSelector } from "react-redux";
import { NEXT_MATCH_FOUND, NO_MATCH_SCHEDULED } from '../redux/actions/types';
import styled from "styled-components";
import heroHole from '../images/heroHole.jpg'


const UpcomingMatches = () => {

  const { match_state, match } = useSelector(
    (state) => state.match

  );


  return (
    <>
    <Hole src={heroHole} alt="golf hole" />
    <Header>
      <h2>Next Match</h2>
    </Header>
    
    {match_state === NEXT_MATCH_FOUND &&
    <Card>
      <Event>
        <h2>{match.event.course.name} {match.event.side_played}</h2>
      </Event>
      <Teams>{match.team1_name} <span>VS</span> {match.team2_name}</Teams>
      <p>{match.event.date}</p>
    </Card>
    }
    {match_state === NO_MATCH_SCHEDULED && (
      <Card>
        <h2>Nothing Scheduled</h2>
      </Card>
    )}
    </>
  )
}

const Hole = styled.img `
  background:  url(${heroHole}) no-repeat center;
  background-size: fit;
  width: 100vw;
  height: 25vh;

`;


const Header = styled.div`
  width: 100%;

  h2{
    font-size: 1.7rem;
    font-weight: 200;
    letter-spacing: 2px
  }

  border-bottom: 1px solid;
  line-height: 4rem;
  padding-left: 1rem;

  `;

const Card = styled.div`
  width: 100%;

  display: flex;
  flex-grow: 1;
  text-align: center;

  flex-direction: column;
  justify-content: center;

  overflow: hidden;
  
  h2{
    font-size: 1.7rem;
    font-weight: 200;
  }

`;

const Event = styled.div `
  display: flex;
  justify-content: space-around;
  font-size: 1.3rem;

`;

const Teams = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-weight: 300;
  font-size: 1.2rem;
  span{
      font-size: 1.5rem;
      color: var(--active)
  }

`;


export default UpcomingMatches