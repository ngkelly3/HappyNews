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

    return (
      <div>
        {Object.keys(posts).map( (key, index) =>
          <Post key={key} post={ posts[key] } />
        )}
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  console.log(posts);
  return {
    posts: posts
  }
}

export default connect(mapStateToProps, { fetchPosts })(ListPosts)
