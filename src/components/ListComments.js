import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../actions'

class ListComments extends Component {

  componentDidMount() {
    this.props.fetchComments(this.props.id);
  }

  render() {
    const { postComments } = this.props;
    if (!postComments) {
      return <div>Loading comments...</div>
    }

    return(
      <div>
        {postComments.map(comment =>
          <div>{comment.body}</div>
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
