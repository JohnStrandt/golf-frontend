import jwt_decode from 'jwt-decode';
import axios from 'axios';
import dayjs from 'dayjs';
import { useContext } from 'react';

import { apiURL, tokenRefreshURL } from '../urls';
import AuthContext from '../context/AuthContext';


const useAxios = () => {
  const {authTokens, setAuthTokens, setUser} = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: apiURL,
    headers: {Authorization: `Bearer ${authTokens?.access}`}
  });

  axiosInstance.interceptors.request.use(async req => {

    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExpired) return req;

    const response = await axios.post(tokenRefreshURL, {
      refresh: authTokens.refresh 
    });

    localStorage.setItem('authTokens', JSON.stringify(response.data));

    setAuthTokens(response.data);
    setUser(jwt_decode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.access}`;
  
    return req;
  });


  return axiosInstance;
}

export default useAxios;