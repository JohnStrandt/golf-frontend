// URL
export const baseURL = 'http://127.0.0.1:8000';
export const apiURL = `${baseURL}/api`;


const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  if (month < 10){
    return `0${month}`;
  } else {
    return month;
  }
};

const getCurrentDay = () => {
  const day = new Date().getDate();
  if (day < 10){
    return `0${day}`;
  } else {
    return day;
  }
};

const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;




// TOKENS 
// tokenRefresh in useAxios.js
// loginURL, registerURL in AuthContext.js
export const loginURL = `${apiURL}/token/`;
export const tokenRefreshURL = `${apiURL}/token/refresh/`;
export const registerURL = `${apiURL}/register/`;


// PLAYERS
export const playersURL = `${apiURL}/players/`;
export const profileURL = (player_id) => `${apiURL}/players/${player_id}/`;


// EVENTS
export const eventsURL =`${apiURL}/events/`


// MATCHES
export const matchesURL = (event_id) => `${apiURL}/events/${event_id}/matches/`


// MATCH
export const matchURL = `${apiURL}/match/`
export const rostersURL = `${apiURL}/match/rosters/`
export const matchInitURL = `${apiURL}/match/init/`






// POPULAR GAMES
const popular_games = `games?date=${currentDate}`;


// GAMES URLs
export const popularGamesURL = () => `${apiURL}${popular_games}`;


// GAME DETAILS - FUNCTION BECAUSE PASSING PARAMETERS
export const gameDetailsURL = (game_id) => `${apiURL}games/${game_id}`;

// SEARCHED GAMES
export const searchGameURL = (game_name) => `${apiURL}games?search=${game_name}&page_size=9`;