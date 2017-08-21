import { combineReducers } from 'redux';

import { FETCH_POSTS } from '../actions';

function posts (state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS :
      const { posts } = action

      return {
        posts
      }
    default:
      return state;
  }
}

export default combineReducers({
  posts,
})
