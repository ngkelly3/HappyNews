import React, { Component } from 'react';
import { connect } from 'react-redux';

class ListPosts extends Component {

  render() {
    return (
      <div>
        We are listing posts here
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

export default connect(mapStateToProps)(ListPosts)
