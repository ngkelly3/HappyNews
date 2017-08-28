import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { upVotePost, downVotePost, deletePost } from '../actions';

class Post extends Component {

  upVote = (id, comment) => {
    this.props.upVotePost(id, comment);
  }

  downVote = (id, comment) => {
    this.props.downVotePost(id, comment);
  }

  deletePost = (post, category, comment) => {

    this.props.deletePost(post.id, comment, () => {
      this.props.history.push(`/${category}/${post.parentId}`);
    });
  }

  render() {

    const { post, comment, voteScore } = this.props;
    const { id } = post;
    let { category } = post;
    const { parentId } = post;

    if (!post) {
      return (
        <div>Loading...</div>
      )
    }

    if (!category) {
      category = this.props.match.params.category;
    }

    console.log("The post is:", post);

    return(
      <div className ='post'>
        <div className='row'>
              <div className='col-md-12'>Author: {post.author}</div>
            <div className='col-md-3'>
              <Button bsClass='btn' onClick={() => this.upVote(id, comment)}>Upvote</Button>
              {voteScore}
              <Button bsClass='btn' onClick={() => this.downVote(id, comment)}>Downvote</Button>
            </div>
            <div className='col-md-6'>
              {post.body}
            </div>
            <div className='col-md-3'>
              <Button bsClass='btn btn-danger btn-xs'
                      onClick={() => this.deletePost(post, category, comment)}
                      className='pull-right'
              >
                delete
              </Button>
                <Link className='btn btn-primary btn-xs pull-right'
                        to={`/comment/edit/${category}/${id}/${parentId}`}
                >
                  edit
                </Link>
            </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ comments }, ownProps) {
  return {
    comments
  }
}


export default withRouter(connect(mapStateToProps, { upVotePost, downVotePost, deletePost })(Post))
