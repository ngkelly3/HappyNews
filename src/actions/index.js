import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const CREATE_POST = 'CREATE_POST';
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

export function createPost(values, callback) {

  // create form input here, send as a PUT request
  // id:
  // timestamp:
  // title:
  // body:
  // author:
  // category:
  const uuidv4 = require('uuid/v4');
  var params = {
    id: uuidv4(),
    timestamp: Date.now()
  }
  console.log(params);
  console.log(values);


  return {
    type: CREATE_POST,
    payload: {}
  }

}

export function upVotePost(id, comment) {

  switch (comment) {
    case false:
      const request = axios.post(`${ROOT_URL}/posts/${id}`, { option: "upVote" }, { headers });
      return {
        type: UPVOTE_POST,
        payload: request
      }
      break;
    case true:
      const request2 = axios.post(`${ROOT_URL}/comments/${id}`, { option: "upVote" }, { headers });
      return {
        type: UPVOTE_COMMENT,
        payload: request2
      }
      break;
    default:
      break;
  }

}

export function downVotePost(id, comment) {

  switch (comment) {
    case false:
      const request = axios.post(`${ROOT_URL}/posts/${id}`, { option: "downVote" }, { headers });
      return {
        type: DOWNVOTE_POST,
        payload: request
      }
      break;
    case true:
      const request2 = axios.post(`${ROOT_URL}/comments/${id}`, { option: "downVote" }, { headers });
      return {
        type: DOWNVOTE_COMMENT,
        payload: request2
      }
      break;
    default:
      break;
  }
}

export function fetchComments(id) {

  const request = axios.get(`${ROOT_URL}/posts/${id}/comments`, { headers });

  return {
    type: FETCH_COMMENTS,
    payload: request
  }

}
