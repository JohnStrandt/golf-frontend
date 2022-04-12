import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import useLocalStorage from "use-local-storage";
import PrivateRoute from "./utils/PrivateRoute";
import { Home, Login, Reset, Register, Match } from "./pages";
import { Footer } from "./components";

import { Provider } from "react-redux";
import store from './redux/store'



function App() {

  const [theme, setTheme] = useLocalStorage('theme', 'theme' ? 'dark' : 'light');
  const toggleTheme = () => {
  const newTheme = theme === "light" ? "dark" : "light";
  setTheme(newTheme);
  }

  return (
    <div app-theme={theme} >
      <Provider store={store}>
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
      </Provider>
    </div>
  );
}


export default App;
