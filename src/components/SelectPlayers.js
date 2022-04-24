import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { IoIosSwap } from "react-icons/io";
import { SET_MATCH_READY } from "../redux/actions/types";
const baseURL = process.env.REACT_APP_BASE_URL;



const SelectPlayers = () => {

  const { match, team1, team2, subs1, subs2 } = useSelector(
    (state) => state.match
  );
  const { league } = useSelector((state) => state.user);
  
  const event = match.event;
  const course = match.event.course;

  const dispatch = useDispatch();


  // using one index variable was error prone (on edge cases)
  // so I made one for each team - seems bullet proof now...
  const [indexOne, setIndexOne] = useState(0);
  const [indexTwo, setIndexTwo] = useState(0);
  const [teamOne, setTeamOne] = useState([...team1]);
  const [subsOne, setSubsOne] = useState([...subs1])
  const [teamTwo, setTeamTwo] = useState([...team2]);
  const [subsTwo, setSubsTwo] = useState([...subs2])


  const swap = (player, team, subs) => {

    let index;
    if(team === teamOne) index = indexOne;
    else index = indexTwo;

    let playerIndex = team.findIndex(_player => {
      return _player.id === player.id;
    });
  
    let temp = subs[index];
    subs[index] = team[playerIndex];
    team[playerIndex] = temp;

    if(team === teamOne) {
      setTeamOne([...team]);
      setSubsOne([...subs]);
      if (index === subs.length - 1) setIndexOne(0);
      else setIndexOne(index + 1);
    } else {
      setTeamTwo([...team]);
      setSubsTwo([...subs]);
      if (index === subs.length - 1) setIndexTwo(0);
      else setIndexTwo(index + 1);
    }

  }

  const next_handler = () => {
    console.log("next");

    console.log(teamOne);
    console.log(teamTwo);



    // don't need these, necessarily
    // dispatch(SET_LINEUP_READY);
    // dispatch(SET_MATCH_READY);

    // lineup_ready = true, or match_ready = true, or both?
    // lineup_ready only to have a confirm lineup page (back button)
    // match_ready goes on to score the match

    // makeCards(teamOne, teamTwo)
  }


  return (
    <Page>
      <Header>
        <h2>
          {league.name} {event.name}
        </h2>
        <h3>
          {course.name} {event.side_played}
        </h3>
        <h3 className="highlight">{match.name}</h3>
      </Header>

      <Teams>
        <h3>{match.team1_name}</h3>

        {teamOne.map((player) => (
          <Card key={player.id}>
            <ProfilePic
              src={baseURL + player.profile_image}
              alt="profile pic"
            />

            <Profile>
              <ProfileName>{player.name}</ProfileName>
              {subs1.length > 0 && (
                <Swap onClick={() => swap(player, teamOne, subsOne)}>
                  <IoIosSwap />
                  <span>swap</span>
                </Swap>
              )}
            </Profile>
          </Card>
        ))}

        <h3>{match.team2_name}</h3>

        {teamTwo.map((player) => (
          <Card key={player.id}>
            <ProfilePic
              src={baseURL + player.profile_image}
              alt="profile pic"
            />

            <Profile>
              <ProfileName>{player.name}</ProfileName>
              {subs2.length > 0 && (
                <Swap onClick={() => swap(player, teamTwo, subsTwo)}>
                  <IoIosSwap />
                  <span>swop</span>
                </Swap>
              )}
            </Profile>
          </Card>
        ))}
      </Teams>

      <Next onClick={() => next_handler()}>Next</Next>

    </Page>
    
  );
};

const Page = styled.div`
  height: 100%;
  width: 100vw;
  background-color: var(--background);
  color: var(--text-primary);

  display: flex;
  flex-direction: column;
  align-items: center;

  .highlight {
    color: var(--active);
  }

  h2,
  h3 {
    font-weight: 300;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  text-align: center;
  color: var(--text-hero);
`;

const Teams = styled.div`
  width: 100%;
  flex-grow: 1; // take up left over space
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Card = styled.div`
  width: min(95%, 550px);

  display: flex;
  align-items: center;

  border: var(--text-hero) 1px solid;
  border-radius: 10px;
  padding: 0.5rem;
  overflow: hidden;
`;

const Profile = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  margin: 0 1.5rem;
`;

const ProfilePic = styled.img`
  border-radius: 50%;
  border: 1px solid var(--background);
  object-fit: cover;
  height: 3.2rem;
  width: 3.2rem;
`;

const ProfileName = styled.p`
  font-size: 1rem;
  font-weight: 400;
`;

const Swap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 1.5rem;

  color: var(--text-primary);
  gap: 2px;

  &:hover {
    cursor: pointer;
  }

  span {
    font-size: 0.8rem;
    font-weight: 300;
  }
`;

const Next = styled.button`
  font-size: 1rem;
  color: var(--active);
  background: none;
  border: 1px solid var(--active);
  border-radius: 5px;
  width: 75%;
  margin: 1rem;
  padding: 0.5rem 0rem;

  &:hover {
    background: var(--active);
    color: var(--background);
  }
`;

export default SelectPlayers;
