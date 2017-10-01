import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';

import { FETCH_POSTS,
         FETCH_POST,
         FETCH_CATEGORY_POSTS,
         FETCH_COMMENTS,
         FETCH_COMMENT,
         FETCH_CATEGORIES,
         UPVOTE_POST,
         DOWNVOTE_POST,
         UPVOTE_COMMENT,
         DOWNVOTE_COMMENT,
         CREATE_POST,
         CREATE_COMMENT,
         DELETE_POST,
         DELETE_COMMENT,
         EDIT_COMMENT,
         EDIT_POST } from '../actions';

function posts (state = [], action) {
  switch (action.type) {
    case FETCH_POSTS:
      // console.log("Payload should be stored in this object ", action);
      // sort the list by score and return it
      let newState = action.payload.data.filter(post => !post.deleted)
        .sort((a,b) => b.voteScore - a.voteScore);
      return newState;
    case FETCH_CATEGORY_POSTS:
      newState = action.payload.data.filter(post => !post.deleted)
        .sort((a,b) => b.voteScore - a.voteScore);
      return newState;
    case UPVOTE_POST:
      // console.log("After trying an upvote", action.payload.data.id);
      newState = [...state];
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
    case DELETE_POST:
      console.log("testing id payload", action.payload)
      newState = state.filter(post => post.id !== action.payload);
      return newState;
    default:
      return state;
  }
}

function activePost (state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
      console.log("Payload for fetching a post is", action.payload.data);
      if(_.isEmpty(action.payload.data))
        console.log("Testing that the object is empty")

      return action.payload.data
    case UPVOTE_POST:
      let newState = {...state};
      newState.voteScore++;
      //console.log("The new score is: ", newState.voteScore)
      return newState;
    case DOWNVOTE_POST:
      newState = {...state};
      newState.voteScore--;
      return newState;
    case EDIT_POST:
      return state;
    default:
      return state;
  }
}

function postComments (state = [], action) {
  switch(action.type) {
    case FETCH_COMMENTS:
      // console.log(action.payload.data)
      let newState = action.payload.data.filter(comment => !comment.deleted && !comment.parentDeleted)
        .sort((a,b) => b.voteScore - a.voteScore)
      return newState;
    case DOWNVOTE_COMMENT:
      newState = [...state];
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
    case DELETE_COMMENT:
      newState = state.filter(comment => comment.id !== action.payload);
      return newState;
    default:
      return state;
  }
}

function activeComment (state = {}, action) {
  switch (action.type) {
    case FETCH_COMMENT:
      console.log("Payload for fetching a comment is", action.payload.data);

      if(_.isEmpty(action.payload.data))
        console.log("Testing that the object is empty")

      return action.payload.data;
    case EDIT_COMMENT:
      return state;
    default:
      return state;
  }
}

function categories(state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload.data;
    default:
      return state
  }
}

export default combineReducers({
  posts,
  activePost,
  postComments,
  activeComment,
  categories,
  form: formReducer
})
