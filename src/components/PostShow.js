import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/index.js';
import { Link } from 'react-router-dom';
import Post from './Post.js'
import ListComments from './ListComments.js'

class PostShow extends Component {

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  render() {

    const { post } = this.props;
    if (!post) {
      return <div>Loading...</div>
    }

    const { id } = this.props.match.params;
    const { category } = post;

    return (
      <div className='nav-padding'>
        <Post post={post} voteScore={post.voteScore} comment={false} />
        <div className='row post'>
          <div className='col-md-3' />
          <div className='col-md-6'>{post.body}</div>
        </div>
        <ListComments id={id}/>
        <Link to={`/comment/new/${category}/${id}`} className='btn btn-primary pull-right'>
          Add a comment
        </Link>
      </div>
    )
  }
}

function mapStateToProps({ activePost }) {

  console.log("I should be activated after an upvote", activePost);
  return (
    {
      post: activePost
    }
  )
}

export default connect(mapStateToProps, { fetchPost })(PostShow);
