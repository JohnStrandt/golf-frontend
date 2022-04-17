import {
  REFRESH_TOKEN,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";
import AuthService from "../services/authService";


export const register = (first_name, last_name, username, email, password) => (dispatch) => {
  return AuthService.register(first_name, last_name, username, email, password).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: REGISTER_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {

  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};

export const refreshToken = (access) => (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN,
    payload: access,
  });
};

// OTHER POSSIBLE ACTIONS:



// – register()

// calls the AuthService.register(username, email, password)
// dispatch REGISTER_SUCCESS and SET_MESSAGE if successful
// dispatch REGISTER_FAIL and SET_MESSAGE if failed


// – login()

// calls the AuthService.login(username, password)
// dispatch LOGIN_SUCCESS and SET_MESSAGE if successful
// dispatch LOGIN_FAIL and SET_MESSAGE if failed
// Both action creators return a Promise for Components using them
