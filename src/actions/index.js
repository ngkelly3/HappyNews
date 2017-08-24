import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
const ROOT_URL = 'http://localhost:5001'

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Authorization': token
}

export function fetchPosts () {
  const request = axios.get(`${ROOT_URL}/posts`, { headers });
  // console.log("Request: ", request);

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function fetchPost(id) {
  console.log("action type: fetchPost: ", id);
  const request = axios.get(`${ROOT_URL}/posts/${id}`, { headers });

  return {
    type: FETCH_POST,
    payload: request
  }
}

export function upVotePost(id) {

  const request = axios.post(`${ROOT_URL}/posts/${id}`, { option: "upVote" }, { headers });
  return {
    type: UPVOTE_POST,
    payload: request
  }
}

export function downVotePost(id) {

  const request = axios.post(`${ROOT_URL}/posts/${id}`, { option: "downVote" }, { headers });
  return {
    type: DOWNVOTE_POST,
    payload: request
  }
}

export function fetchComments(id) {

  const request = axios.get(`${ROOT_URL}/posts/${id}/comments`, { headers });

  return {
    type: FETCH_COMMENTS,
    payload: request
  }

}
