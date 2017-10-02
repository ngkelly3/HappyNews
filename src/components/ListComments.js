import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchComments} from '../actions'
import Comment from './Comment.js'

class ListComments extends Component {

  componentDidMount() {
    this.props.fetchComments(this.props.id);
  }

  render() {

    const {postComments, id} = this.props;
    if (!postComments) {
      return <div>Loading comments...</div>
    }

    return (
      <div className='row'>
        {postComments.length === 0
          ? <div className='col-md-12'>Nobody has commented yet.</div>
          : postComments.map(comment =>
            <Comment key={comment.id}
                     post={comment}
                     voteScore={comment.voteScore}
                     id={id}
                     comment={true}/>)}
      </div>
    )
  }
}

function mapStateToProps({postComments}) {
  return {postComments}
}

export default connect(mapStateToProps, {fetchComments})(ListComments);
