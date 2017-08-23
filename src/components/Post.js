import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
            <div className='col-md-3'>
              <Button bsClass='btn'>Upvote</Button>
              {post.voteScore}
              <Button bsClass='btn'>Downvote</Button>
            </div>
            <div className='col-md-6'>{post.title}</div>
            <Link className='btn btn-secondary' to={`/${post.id}`}>
              Post Detail
            </Link>
        </div>
        <div className='row'>
          <div className='col-md-12'>Author: {post.author}</div>
        </div>
      </div>
    )
  }
}


export default connect()(Post)
