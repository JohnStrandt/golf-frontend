import api from "./api";


const getTodaysMatch = async () => {
  const response = await api.get("/match/")
  return response.data;
};


const updateMatchTeams = async (id, teamOne, teamTwo) => {
  let team1 = [teamOne[0].id, teamOne[1].id];
  let team2 = [teamTwo[0].id, teamTwo[1].id];

  const data = {
    team1: team1,
    team2: team2
  }

  const response = await api.post(`/match/${id}/update-teams/`, data)
  return response.data;
};


const getScorecards = async (id, team1, team2) => {

  const data = {
    team1: team1,
    team2: team2
  }

  const response = await api.post(`/match/${id}/make-scorecards/`, data)
  return response.data;
};


// const startResumeMatch = async (id) => {
//   const response = await api.get(`/match/${id}/`)
//   return response.data;
// };


const scoreHole = async (id, body) => {
  const response = await api.post(`/match/${id}/`, body)
  return response.data;
}


const MatchService = {
  getTodaysMatch,
  updateMatchTeams,
  getScorecards,
  scoreHole,
};

export default MatchService;
