import { combineReducers } from 'redux';

import { FETCH_POSTS } from '../actions';

function posts (state = [], action) {
  // console.log("Payload should be stored in this object ", action);

  switch (action.type) {
    case FETCH_POSTS :
      // sort the list by score and return it
      action.payload.data.sort((a,b) => b.voteScore - a.voteScore)
      return action.payload.data
    default:
      return state;
  }
}

export default combineReducers({
  posts,
})
