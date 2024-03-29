import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector  } from 'react-redux';
import useLocalStorage from "use-local-storage";
import PrivateRoute from "./utils/PrivateRoute";
import { Home, Match } from "./pages";
import { Footer, Login, Register, Reset } from "./components";
import { getLeague }from "./redux/actions/user";
import styled from "styled-components";


function App() {
  const dispatch = useDispatch();
  const { league_loaded } = useSelector((state) => state.user);
  
  useEffect(() => {
    if (!league_loaded) dispatch(getLeague());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const [theme, setTheme] = useLocalStorage('theme', 'theme' ? 'dark' : 'light');
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  return (
    <main app-theme={theme}>
      <Main>
        <Router>
          <Routes>
            <Route path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/register" element={<Register />} />
            <Route path="/match" element={<Match toggleTheme={toggleTheme} />} />
          </Routes>
          <Footer toggleTheme={toggleTheme} theme={theme}/>
        </Router>
      </Main>
    </main>
  );
}

const Main = styled.div`

  height: 100vh;

`

export default App;
