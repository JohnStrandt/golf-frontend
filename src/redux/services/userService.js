import api from "./api";


const getPlayers = async () => {
  const response = await api.get("/players")
  return response.data;
};


const UserService = {
  getPlayers,
};

export default UserService;
