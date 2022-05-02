import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { scoreHole } from "../redux/actions/match";

import styled from "styled-components";
import { BiPlus, BiMinus } from "react-icons/bi";
const baseURL = process.env.REACT_APP_BASE_URL;



const ScoreMatch = () => {

  const {
    match,
    holes,
    cards1,
    cards2,
    handicap
  } = useSelector((state) => state.match);

  const dispatch = useDispatch();

  const current_hole = match.current_hole;

  const ids1 = {
    "team": cards1.team.id,
    "players": [cards1.players[0].id, cards1.players[1].id]
  }

  const ids2 = {
    "team": cards2.team.id,
    "players": [cards2.players[0].id, cards2.players[1].id]
  }

  const players = [].concat(cards1.players, cards2.players);

  const index = String(current_hole);
  const strokes = handicap.hdcp.strokes[index];
  const hdcp_team = handicap.hdcp.team;
  const stroke_s = (strokes === 1) ? "stroke" : "strokes";
  const side = (index < 10) ? "Front" : "Back";


  // if scores exist, load them, else init to par
  const initial_scores = {};
  const [scores, setScores] = useState({});

  useEffect(() => {

    players.forEach(player => {
      initial_scores[String(player.id)] = holes[index].par;
    })
    setScores({...initial_scores})

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[current_hole])


  const increment = (id) => {

    scores[String(id)] = scores[String(id)] + 1;
    let incremented = {...scores};
    setScores(incremented)
  }

  const decrement = (id) => {

    scores[String(id)] = scores[String(id)] - 1;
    let decremented = {...scores};
    setScores(decremented)
  }


  const next_handler = () => {

    let total1 = 0;
    let total2 = 0;
    let points1 = 0;
    let points2 = 0;
    let data = {};

    ids1["players"].forEach((id) => {
      total1 = total1 + scores[id];
    })

    ids2["players"].forEach((id) => {
      total2 = total2 + scores[id];
    })

    // check for a handicap advantage
    if(ids1["team"] === handicap.hdcp.card_id){
      total1 = total1 - strokes;
    } else {
      total2 = total2 - strokes;
    }

    // points given for win or tie on each hole
    if (total1 < total2) points1 = 2;
    else if (total2 < total1) points2 = 2;
    else {
      points1 = 1;
      points2 = 1;
    }

    const player_ids = [...ids1.players, ...ids2.players]

    // create data for api POST to score each hole
    data["hole"] = current_hole;
    data["side"] = side;
    data["team_cards"] = [
      {"id": ids1.team, "score": points1},
      {"id": ids2.team, "score": points2},
    ];

    data["player_cards"] = [];

    player_ids.forEach(id => {

      data["player_cards"].push({
        "id": id,
      "score": scores[String(id)]
      });
    });

    const holeScores = JSON.stringify(data);
    dispatch(scoreHole(match.id, holeScores));

  }


  return (
    <Page>
      <Header>

        <div className='hole-number'>
          <h2>{holes[index].number}</h2>
        </div>
        <h2>
          {match.event.course.name} { side }
        </h2>
        <div className='hole-info'>
          <p>par <span>{holes[index].par}</span></p>
          <p><span>{holes[index].yardage}</span> yards</p>
          <p>hdcp <span>{holes[index].handicap}</span></p>
        </div>
        <div className='strokes'>
          <p>{ hdcp_team } gets <span> { strokes } </span> { stroke_s }</p>
          {/* -- if images exist -- see hole -- */}
          <ShowHole onClick={() => next_handler()}>See Hole</ShowHole>
        </div>

      </Header>

      <Scoring>
        {players.map((player) => (
          <Card key={player.id}>
            <ProfilePic
              src={baseURL + player.profile_image}
              alt="profile pic"
            />
            <Profile>
              <p className='profile-name'>{player.name}</p>
              <ButtonContainer>
                <ScoringButton onClick={() => decrement(player.id)}>
                  { <BiMinus color="white"/> }
                </ScoringButton>

                <p className="score">{ scores[player.id] }</p>

                <ScoringButton onClick={() => increment(player.id)}>
                  { <BiPlus color="white"/> }
                </ScoringButton>
              </ButtonContainer>
            </Profile>
          </Card>
        ))}

        <Next onClick={() => next_handler()}>Next Hole</Next>
      </Scoring>

    </Page>
  )
}


const Page = styled.div`
  height: 100%;
  width: 100vw;

  background-color: var(--background);
  color: var(--text-primary);

  display: flex;
  flex-direction: column;
  align-items: center;

`;


const Header = styled.div`
  width: 100%;
  height: 35%;

  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;// hole number

  color: var(--text-hero);

  span{
    font-size: 2rem;
    color: var(--active)
  }

  h2{
    font-size: 1.5rem;
    font-weight: 300;
  }

  .strokes{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    & span {
      font-weight: 300;
      font-size: 1.5rem;
    }
  }

  .hole-number{
    display: flex;
    justify-content: center;
    align-items: center;
    
    height: 5rem;
    width: 5rem;
    background: green;
    border-radius: 50%;
    
    h2{
        font-size: 3rem;
        font-weight: 400;
    }
  }

  .hole-info{
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

`;


const Scoring = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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
  margin: 0 .7rem;

  .profile-name{
      font-size: 1rem;
      font-weight: 400;
    }
`;


const ProfilePic = styled.img`
  border-radius: 50%;
  border: 1px solid var(--background);
  object-fit: cover;
  height: 3.2rem;
  width: 3.2rem;
`;


const Next = styled.button`
  font-size: 1rem;
  color: var(--active);
  background: none;
  border: 1px solid var(--active);
  border-radius: 5px;
  width: 75%;
  padding: 0.5rem 0rem;

`;


const ShowHole = styled.a`
  font-size: 1.1rem;
  font-weight: 300;
  color: var(--active);

`;


const ButtonContainer = styled.div`
  width: 5.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .score {
    font-size: 2rem;
    font-weight: 300;
    color: var(--active);
  }

`;


const ScoringButton = styled.a`
  font-size: 1.3rem;
  color: white;
  /* color: var(--active); */

`;


export default ScoreMatch