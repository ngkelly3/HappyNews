import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const FETCH_COMMENT = 'FETCH_COMMENT';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const CREATE_POST = 'CREATE_POST';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const EDIT_POST = 'EDIT_POST';
const ROOT_URL = 'http://localhost:5001';
axios.defaults.headers.post['Content-Type'] = 'application/json';

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

export function fetchCategoryPosts(category) {
  const request = axios.get(`${ROOT_URL}/${category}/posts`, { headers });
  // console.log("Request: ", request);

  return {
    type: FETCH_CATEGORY_POSTS,
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

export function fetchCategories() {
  const request = axios.get(`${ROOT_URL}/categories`, { headers });

  return {
    type: FETCH_CATEGORIES,
    payload: request
  }
}

export function createPost(values, callback) {

  const { title, body, category } = values;
  const uuidv4 = require('uuid/v4');
  var data = {
    id: uuidv4(),
    timestamp: Date.now(),
    title,
    body,
    author: 'default_author',
    category
  }
  // console.log(params);
  // console.log(values);
  //
  // const request = axios.post(`${ROOT_URL}/posts`, { data }, { headers })
  //   .then(() => callback());

  axios({
    method: 'post',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    url: `${ROOT_URL}/posts`,
    data
  }).then(() => callback());

  return {
    type: CREATE_POST,
    payload: {}
  }

}

export function createComment(values, parentId, callback) {

  const { body } = values;
  const uuidv4 = require('uuid/v4');
  var data = {
    id: uuidv4(),
    timestamp: Date.now(),
    body,
    author: 'default_author',
    parentId
  }
  // console.log(params);
  // console.log(values);
  //
  // const request = axios.post(`${ROOT_URL}/posts`, { data }, { headers })
  //   .then(() => callback());

  axios({
    method: 'post',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    url: `${ROOT_URL}/comments`,
    data
  }).then(() => callback());

  return {
    type: CREATE_COMMENT,
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
    case true:
      const request2 = axios.post(`${ROOT_URL}/comments/${id}`, { option: "upVote" }, { headers });
      return {
        type: UPVOTE_COMMENT,
        payload: request2
      }
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
    case true:
      const request2 = axios.post(`${ROOT_URL}/comments/${id}`, { option: "downVote" }, { headers });
      return {
        type: DOWNVOTE_COMMENT,
        payload: request2
      }
    default:
      break;
  }
}

export function deletePost(id, comment, callback) {

  switch (comment) {
    case false:
      axios.delete(`${ROOT_URL}/posts/${id}`, { headers })
        .then(() => callback());
      return {
        type: DELETE_POST,
        payload: id
      }
    case true:
      axios.delete(`${ROOT_URL}/comments/${id}`, { headers })
        .then(() => callback());
      return {
        type: DELETE_COMMENT,
        payload: id
      }
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

export function fetchComment(id) {
  const request = axios.get(`${ROOT_URL}/comments/${id}`, { headers });
  // console.log(request);
  return {
    type: FETCH_COMMENT,
    payload: request
  }
}

export function editComment(values, id, callback) {

  const { body } = values;
  var data = {
    timestamp: Date.now(),
    body
  }

  axios({
    method: 'put',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    url: `${ROOT_URL}/comments/${id}`,
    data
  }).then(() => callback());
  // console.log(request);
  return {
    type: EDIT_COMMENT,
    payload: {}
  }
}

export function editPost(values, id, callback) {
  const { title, body } = values;
  var data = {
    timestamp: Date.now(),
    body,
    title
  }

  axios({
    method: 'put',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    url: `${ROOT_URL}/posts/${id}`,
    data
  }).then(() => callback());

  return {
    type: EDIT_POST,
    payload: {}
  }

}
