import { combineReducers } from 'redux';

import { FETCH_POSTS } from '../actions';

function posts (state = {}, action) {
  // console.log("Payload should be stored in this object ", action);

  switch (action.type) {
    case FETCH_POSTS :
      // const { data } = action.payload
      // console.log("The posts are: ", data);

      return action.payload.data
    default:
      return state;
  }
}

export default combineReducers({
  posts,
})
