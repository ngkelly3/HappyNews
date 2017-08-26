import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../actions'
import Post from './Post.js'

class ListComments extends Component {

  componentDidMount() {
    this.props.fetchComments(this.props.id);
  }

  render() {

    const { postComments, id } = this.props;
    if (!postComments) {
      return <div>Loading comments...</div>
    }

    return(
      <div>
        { postComments.length === 0 ? <div></div> : <h3>Comments</h3> }
        {postComments.map(comment =>
          <Post key={comment.id} post={comment} voteScore={comment.voteScore} id={id} comment={true} />
        )}
      </div>
    )
  }
}

function mapStateToProps({ postComments }) {
  return {
    postComments
  }
}

export default connect(mapStateToProps, { fetchComments })(ListComments);
