import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { loginURL, registerURL } from "../urls";


const AuthContext = createContext({});
export default AuthContext;



export const AuthProvider = ({ children }) => {
  let navigate = useNavigate();

  // children represents the components nested within the AuthProvider

  let tokens = localStorage.getItem("authTokens");

  const [authTokens, setAuthTokens] = useState(tokens ? JSON.parse(tokens) : null);
  const [user, setUser] = useState(tokens ? jwt_decode(tokens) : null);

  const [loading, setLoading] = useState(true);


  let loginUser = async (e) => {
    e.preventDefault();

    let response = await fetch(loginURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value
      })
    });

    let data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      alert("Something went wrong!");
    }
  };



  let registerUser = async (e) => {
    e.preventDefault();

    let response = await fetch(registerURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value
      })
    });

    let data = await response.json();

    if (response.status === 201) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      alert("Something went wrong!");
    }
  };


  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };


  let contextData = {
    user: user,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUser: loginUser,
    registerUser: registerUser,
    logoutUser: logoutUser
  };

  useEffect(() => {
    if (authTokens) setUser(jwt_decode(authTokens.access));
    setLoading(false);
  }, [authTokens, loading]);


  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
