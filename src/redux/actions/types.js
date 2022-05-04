
// USER
export const FETCH_PLAYERS = "FETCH_PLAYERS";
export const FETCH_LEAGUE = "FETCH_LEAGUE";


// AUTH
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";


// MATCH

// api calls
export const FETCH_TODAYS_MATCH = "FETCH_TODAYS_MATCH";
export const FETCH_NEXT_MATCH = "FETCH_NEXT_MATCH";
export const UPDATE_MATCH_TEAMS = "UPDATE_MATCH_TEAMS";
export const GET_SCORECARDS = "GET_SCORECARDS";// get_or_create

export const SCORE_HOLE = "SCORE_HOLE";
export const AWARD_BONUS = "AWARD_BONUS";

// state machine constants in match.js
export const NO_DATA = "NO_DATA";
export const MATCH_FOUND = "MATCH_FOUND";
export const MATCH_NOT_FOUND = "MATCH_NOT_FOUND";
export const NEXT_MATCH_FOUND = "NEXT_MATCH_FOUND";
export const NO_MATCH_SCHEDULED = "NO_MATCH_SCHEDULED";
export const PLAYERS_SELECTED = "PLAYERS_SELECTED";
export const MATCH_UPDATED = "MATCH_UPDATED";
export const SCORING = "SCORING";
export const MATCH_OVER = "MATCH_OVER";


export const SET_LOADING = "SET_LOADING";
export const SET_MATCH_NOT_FOUND = "SET_MATCH_NOT_FOUND";
export const SET_NO_MATCH_SCHEDULED = "SET_NO_MATCH_SCHEDULED";


// MESSAGE
export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";


// NOT REALLY USED
export const CLEAR_STATE = "CLEAR_STATE";