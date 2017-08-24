import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index.js';
import Post from './Post.js'

class ListPosts extends Component {

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {

    const { posts } = this.props;
    if (!posts) {
      return <div>Loading...</div>
    }

    console.log(this.props.posts);

    return (
      <div>
        {posts.map((post) =>
          <Post key={post.id} post={post} voteScore={post.voteScore} comment={false} />
        )}
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  console.log("Should toggle on an upvote", posts);
  return {
    posts
  }
}

export default connect(mapStateToProps, { fetchPosts })(ListPosts)
