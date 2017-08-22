import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const ACTIVE_POST = 'ACTIVE_POST';

export function fetchPosts () {
  const request = axios.get(`http://localhost:5001/posts`, { headers: { Authorization: "lalala" } });
  // console.log("Request: ", request);

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function activePost(id) {
  console.log(id);

  return {
    type: ACTIVE_POST,
    payload: id
  }
}
