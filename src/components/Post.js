import React, { Component } from 'react';
import { connect } from 'react-redux';

class Post extends Component {

  render() {

    const { post } = this.props;
    if (!post) {
      return (
        <div>Loading...</div>
      )
    }

    return(
      <div>
        <ul>
          <li>{post.title}</li>
          <li>{post.author}</li>
          <li>{post.voteScore}</li>
        </ul>
      </div>
    )
  }
}


export default connect()(Post)
