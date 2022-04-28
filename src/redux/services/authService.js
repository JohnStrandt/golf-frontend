import api from "./api";
import TokenService from "./tokenService";

const register = (first_name, last_name, username, email, password) => {
  return api.post("/auth/register/", {
    first_name,
    last_name,
    username,
    email,
    password
  });
};

const login = async (username, password) => {

  const response = await api
    .post("/auth/login", {
      username,
      password
    });

  if (response.data.access) {
    TokenService.setUser(response.data);
  }
  return response.data;
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;