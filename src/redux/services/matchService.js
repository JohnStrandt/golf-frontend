import api from "./api";


const getTodaysMatch = async () => {
  const response = await api.get("/match/")
  return response.data;
};

const startResumeMatch = async (id) => {
  const response = await api.get(`/match/${id}/`)
  return response.data;
};


const scoreHole = async (id, body) => {
  const response = await api.post(`/match/${id}/`, body)
  return response.data;
}


const MatchService = {
  getTodaysMatch,
  startResumeMatch,
  scoreHole,
};

export default MatchService;
