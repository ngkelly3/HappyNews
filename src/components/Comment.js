import React, { Component } from 'react';
import ArrowDownIcon from 'react-icons/lib/md/keyboard-arrow-down';
import ArrowUpIcon from 'react-icons/lib/md/keyboard-arrow-up';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';
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
      <div>
        <div className='col-md-12'>
          <div className='pull-right'>By: {post.author}</div>
        </div>
        <div className='row post'>
            <div className='col-md-3'>
              <ButtonGroup>
                <Button
                  onClick={() => this.upVote(id, comment)}
                >
                  <ArrowUpIcon size={30} />
                </Button>
                <Button
                  onClick={() => this.downVote(id, comment)}
                  >
                    <ArrowDownIcon size={30}/>
                </Button>
              </ButtonGroup>
              <Button className='score'>
                {voteScore}
              </Button>
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
