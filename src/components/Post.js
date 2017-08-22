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
        <div className='row'>
            <div className='col-md-4'>
              <button>Upvote</button>
              {post.voteScore}
              <button>Downvote</button>
            </div>
            <div className='col-md-6'>{post.title}</div>
        </div>
        <div className='row'>
          <div className='col-md-12'>Author: {post.author}</div>
        </div>
      </div>
    )
  }
}


export default connect()(Post)
