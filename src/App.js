import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import useLocalStorage from "use-local-storage";
import PrivateRoute from "./utils/PrivateRoute";
import { Home, Reset, Register, Match } from "./pages";
import { Footer, Login } from "./components";


function App() {

  const [theme, setTheme] = useLocalStorage('theme', 'theme' ? 'dark' : 'light');
  const toggleTheme = () => {
  const newTheme = theme === "light" ? "dark" : "light";
  setTheme(newTheme);
  }

  return (
    <main app-theme={theme} >
        <Router>
          <AuthProvider>
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
              <Route path="/match" element={<Match />} />
            </Routes>
            <Footer toggleTheme={toggleTheme} theme={theme}/>
          </AuthProvider>
        </Router>
    </main>
  );
}


export default App;
