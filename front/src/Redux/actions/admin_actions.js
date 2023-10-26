import { GET_USERS,NOT_ALLOW } from "../types/form_types";
import axios from 'axios'

export const getUsers = ()=> async dispatch => {
    const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : sessionStorage.getItem('googleToken')
    try {
      const {data} = await axios.get('http://localhost:3001/admin', {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch({
        type:  GET_USERS,
        payload: data,
      });
    } catch (error) {
      if (error.response && error.response.status === 403) {
        dispatch({ 
          type: NOT_ALLOW, 
          error: error.response.data.msg });
      }
    }
  
  }