import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { upVotePost } from '../actions';
import { downVotePost } from '../actions';

class Post extends Component {

  upVote = (id) => {
    this.props.upVotePost(id);
  }

  downVote = (id) => {
    this.props.downVotePost(id);
  }

  render() {

    const { post, comment, voteScore } = this.props;
    if (!post) {
      return (
        <div>Loading...</div>
      )
    }

    console.log("The post is:", post);

    return(
      <div>
        <div className='row'>
            <div className='col-md-3'>
              <Button bsClass='btn' onClick={() => this.upVote(post.id)}>Upvote</Button>
              {this.props.voteScore}
              <Button bsClass='btn' onClick={() => this.downVote(post.id)}>Downvote</Button>
            </div>
            <Link to={`/${post.id}`} className='col-md-6'>{post.title}</Link>
        </div>
        <div className='row'>
          <div className='col-md-12'>Author: {post.author}</div>
        </div>
        { comment ? <div>{post.body}</div> : <div></div>}
      </div>
    )
  }
}


export default connect(null, { upVotePost, downVotePost })(Post)
