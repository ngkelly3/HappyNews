import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { FETCH_POSTS,
         FETCH_POST,
         FETCH_COMMENTS,
         UPVOTE_POST,
         DOWNVOTE_POST,
         UPVOTE_COMMENT,
         DOWNVOTE_COMMENT,
         CREATE_POST,
         CREATE_COMMENT } from '../actions';

function posts (state = [], action) {
  switch (action.type) {
    case FETCH_POSTS:
      // console.log("Payload should be stored in this object ", action);
      // sort the list by score and return it
      action.payload.data.sort((a,b) => b.voteScore - a.voteScore)
      return action.payload.data;
    case UPVOTE_POST:
      // console.log("After trying an upvote", action.payload.data.id);
      let newState = [...state];
      // console.log(newState);
      newState.forEach( post => {
        if (post.id === action.payload.data.id)
          post.voteScore++;
      })
      return newState;
    case DOWNVOTE_POST:
      // console.log("After trying an upvote", action.payload.data.id);
      newState = [...state];
      // console.log(newState);
      newState.forEach( post => {
        if (post.id === action.payload.data.id)
          post.voteScore--;
      })
      return newState;
    case CREATE_POST:
      // We need to add the new post to the state and return the new state

      return state;
    default:
      return state;
  }
}

function activePost (state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
      //console.log("Payload for fetching a post is", action.payload.data);
      return action.payload.data;
    case UPVOTE_POST:
      let newState = {...state};
      newState.voteScore++;
      //console.log("The new score is: ", newState.voteScore)
      return newState;
    case DOWNVOTE_POST:
      newState = {...state};
      newState.voteScore--;
      return newState;
    default:
      return state;
  }
}

function postComments (state = [], action) {
  switch(action.type) {
    case FETCH_COMMENTS:
      // console.log(action.payload.data)
      action.payload.data.sort((a,b) => b.voteScore - a.voteScore)
      return action.payload.data;
    case DOWNVOTE_COMMENT:
      let newState = [...state];
      // console.log(newState);
      newState.forEach( comment => {
        if (comment.id === action.payload.data.id)
          comment.voteScore--;
      })
      return newState;
    case UPVOTE_COMMENT:
      newState = [...state];
      // console.log(newState);
      newState.forEach( comment => {
        if (comment.id === action.payload.data.id)
          comment.voteScore++;
      })
      return newState;
    case CREATE_COMMENT:
      return state;
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  activePost,
  postComments,
  form: formReducer
})
