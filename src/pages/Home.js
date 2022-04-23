import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";

import heroHole from '../images/heroHole.jpg'

import { getPlayers, getLeague }from "../redux/actions/user";


const Home = () => { 
  
  const baseURL = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();
  const { players, players_loaded, league, league_loaded } = useSelector((state) => state.user);


  useEffect(() => {
    if (!league_loaded) dispatch(getLeague());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    if (!players_loaded) dispatch(getPlayers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (

    <Page>
      
      <Header><h1>{league.name}</h1></Header>

        {players.map(player => (
          <Card key={player.id}>

              <ProfilePic src={baseURL+player.profile_image} alt="profile pic" />

              <PlayerInfo>

                <PlayerName>{player.name}</PlayerName>

                <PlayerStats>
                  <p>{player.team}</p>
                  <p>{player.handicap} hdcp</p>
                </PlayerStats>

              </PlayerInfo>


          </Card>
        ))}


    </Page>

  )
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

  background:  url(${heroHole}) no-repeat center;
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

const Card  = styled.div `

    display: flex;
    align-items: center;

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

const PlayerInfo = styled.div`

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

`;

const PlayerName = styled.p`

    font-size: 1rem;
    font-weight: 400;

`;

const PlayerStats = styled.div`

    font-size: .9rem;
    font-weight: 300;
    text-align: center;

`;


export default Home;