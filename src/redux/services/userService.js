import api from "./api";


const getPlayers = async () => {
  const response = await api.get("/players")
  return response.data;
};

const getLeague = async () => {
  const response = await api.get("/league")
  return response.data;
};

const UserService = {
  getLeague,
  getPlayers,
};

export default UserService;
