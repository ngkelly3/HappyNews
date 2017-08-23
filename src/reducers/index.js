import { combineReducers } from 'redux';

import { FETCH_POSTS } from '../actions';
import { FETCH_POST } from '../actions';

function posts (state = [], action) {

  switch (action.type) {
    case FETCH_POSTS :
      // console.log("Payload should be stored in this object ", action);
      // sort the list by score and return it
      action.payload.data.sort((a,b) => b.voteScore - a.voteScore)
      return action.payload.data
    default:
      return state;
  }
}

function activePost (state = {}, action) {

  switch (action.type) {
    case FETCH_POST :
      //console.log("Payload for fetching a post is", action.payload.data);
      return action.payload.data
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  activePost,
})
