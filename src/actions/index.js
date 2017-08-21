import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const REMOVE_FROM_CALENDAR = 'REMOVE_FROM_CALENDAR';


export function fetchPosts () {
  const request = axios.get(`http://localhost:5001/posts`, { headers: { Authorization: "lalala" } });
  // console.log("Request: ", request);

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function removeFromCalendar ({ day, meal }) {
  return {
    type: REMOVE_FROM_CALENDAR,
    day,
    meal
  }
}
