import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPlayers } from "../redux/actions/PlayersActions";

import styled from "styled-components";
import heroHole from "../images/heroHole.jpg";

import AuthContext from "../context/AuthContext";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import axios from "axios";

import { tokenRefreshURL, apiURL, baseURL } from "../urls";

const Match = () => {
  const dispatch = useDispatch();

  const players = useSelector((state) => state.players.players);

  console.log(players);

  const { authTokens, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: apiURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExpired) return req;

    const response = await axios.post(tokenRefreshURL, {
      refresh: authTokens.refresh
    });

    localStorage.setItem("authTokens", JSON.stringify(response.data));
    setAuthTokens(response.data);
  });

  useEffect(() => {
    // console.log(authTokens.access);
    dispatch(loadPlayers(authTokens?.access));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAuthTokens]);

  return (
    <Page>
      <Header>
        <h1>Lakeside</h1>
      </Header>

      {players.map((player) => (
        <Card key={player.id}>
          <ProfilePic src={baseURL + player.profile_image} alt="profile pic" />

          <ProfileName>{player.name}</ProfileName>
        </Card>
      ))}
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
