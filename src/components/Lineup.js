import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { GiBodySwapping } from "react-icons/gi";

const Lineup = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;

  const { match, team1, team2, subs1, subs2 } = useSelector(
    (state) => state.match
  );
  const { league } = useSelector((state) => state.user);
  const event = match.event;
  const course = match.event.course;
  const team1_name = match.team1_name;
  const team2_name = match.team2_name;

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
        <h3>{team1_name}</h3>

        {team1.map((player) => (
          <Card key={player.id}>
            <ProfilePic
              src={baseURL + player.profile_image}
              alt="profile pic"
            />

            <Profile>
              <ProfileName>{player.name}</ProfileName>
              {subs1.length > 0 && (
                <Swap onClick={() => console.log(player.name)}>
                  <GiBodySwapping />
                  <span>swap</span>
                </Swap>
              )}
            </Profile>
          </Card>
        ))}

        <h3>{team2_name}</h3>

        {team2.map((player) => (
          <Card key={player.id}>
            <ProfilePic
              src={baseURL + player.profile_image}
              alt="profile pic"
            />

            <Profile>
              <ProfileName>{player.name}</ProfileName>
              {subs2.lentgth > 0 && (
                <Swap onClick={() => console.log(player.name)}>
                  <GiBodySwapping />
                  <span>swap</span>
                </Swap>
              )}
            </Profile>
          </Card>
        ))}
      </Teams>

      <Next onClick={() => console.log("Next")}>Next</Next>
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

export default Lineup;
