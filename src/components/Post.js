import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { upVotePost } from '../actions';
import { downVotePost } from '../actions';

class Post extends Component {

  upVote = (id, comment) => {
    this.props.upVotePost(id, comment);
  }

  downVote = (id, comment) => {
    this.props.downVotePost(id, comment);
  }

  render() {

    const { post, comment, voteScore } = this.props;
    const { id } = post;

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
              <Button bsClass='btn' onClick={() => this.upVote(id, comment)}>Upvote</Button>
              {voteScore}
              <Button bsClass='btn' onClick={() => this.downVote(id, comment)}>Downvote</Button>
            </div>
            <Link to={`/${id}`} className='col-md-6'>{post.title}</Link>
            <div className='col-md-3'>
              <Button bsClass='btn btn-danger btn-sm' className='pull-xs-right'>
                delete
              </Button>
              <Button bsClass='btn btn-primary btn-sm' className='pull-xs-right'>
                edit
              </Button>
            </div>
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
