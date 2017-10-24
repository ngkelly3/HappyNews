import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchPost, fetchComments } from '../actions';
import { Link } from 'react-router-dom';
import Post from './Post.js'
import PathError from './PathError'
import Comment from './Comment.js'

class PostShow extends Component {

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
    this.props.fetchComments(this.props.match.params.id);
  }

  render() {

    const { post, postComments } = this.props;
    if (!post) {
      return <div>Loading...</div>
    }

    if (!postComments) {
      return <div>Loading comments...</div>
    }

    const { id } = this.props.match.params;
    const { category } = post;

    // console.log(post)
    if(_.isEmpty(post)) {
      return(
        <div className='nav-padding'>
          <PathError />
        </div>
      )
    }

    // console.log(post)

    return (
      <div className='nav-padding'>
        <Post post={post} showContent={true} voteScore={post.voteScore} commentCount={post.commentCount} comment={false} />
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>{post.body}</div>
          <div className='col-md-3'></div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <h3>
              Comments
            </h3>
          </div>
        </div>
          {postComments.length === 0
            ? <div className='row'>
                <div className='col-md-12'>
                  Nobody has commented yet.
                </div>
              </div>
            : postComments.map(comment =>
              <Comment key={comment.id}
                       post={comment}
                       voteScore={comment.voteScore}
                       id={id}
                       comment={true}/>)}
        <div className='row'>
          <div className='col-md-12'>
            <Link to={`/comment/new/${category}/${id}`} className='btn btn-primary pull-right'>
              Add a comment
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ activePost, postComments }) {

  // console.log("I should be activated after an upvote", activePost);
  return (
    {
      post: activePost,
      postComments
    }
  )
}

export default connect(mapStateToProps, { fetchPost, fetchComments })(PostShow);
