import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/index.js';
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

    return (
      <div>
        <Post post={post} />
        <div>{post.body}</div>
        <ListComments id={id}/>
      </div>
    )
  }
}

function mapStateToProps({ activePost }, ownProps) {

  console.log(activePost);
  return (
    {
      post: activePost
    }
  )
}

export default connect(mapStateToProps, { fetchPost })(PostShow);
