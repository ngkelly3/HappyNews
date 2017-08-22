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
              <button className='btn'>Upvote</button>
              {post.voteScore}
              <button className='btn'>Downvote</button>
            </div>
            <div className='col-md-6'>{post.title}</div>
            <button className='btn btn-secondary pull-xs-right'>Post Detail</button>
        </div>
        <div className='row'>
          <div className='col-md-12'>Author: {post.author}</div>
        </div>
      </div>
    )
  }
}


export default connect()(Post)
