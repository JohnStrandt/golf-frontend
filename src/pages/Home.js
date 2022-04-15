
import React, { useState, useEffect } from "react";
// import { useDispatch } from 'react-redux'
import styled from "styled-components";

import { baseURL } from "../urls";
import useAxios from '../utils/useAxios';
import heroHole from '../images/heroHole.jpg'


const Home = () => { 
  
  let [players, setPlayers] = useState([]);
  let api = useAxios();


  let getPlayers = async () => {

    let response = await api.get('/players/');
    if (response.status === 200){
      setPlayers(response.data);
    }

  }

  useEffect(() => {
    getPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])



  return (
    <Page>
      
      <Header><h1>Lakeside</h1></Header>

        {players.map(player => (
          <Card key={player.id}>

              <ProfilePic src={baseURL+player.profile_image} alt="profile pic" />

              <ProfileName>{player.name}</ProfileName>

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


export default Home;