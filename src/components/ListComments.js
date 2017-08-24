import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments } from '../actions'
import { Modal } from 'react-modal';
import Post from './Post.js'

class ListComments extends Component {

  state = {
    addPostModal: false,
  }

  componentDidMount() {
    this.props.fetchComments(this.props.id);
  }

  openPostModal = () => this.setState(() => ({ addPostModal: true }))
  closePostModal = () => this.setState(() => ({ addPostModal: false }))

  render() {

    const { addPostModal } = this.state;

    const { postComments } = this.props;
    if (!postComments) {
      return <div>Loading comments...</div>
    }

    return(
      <div>
        { postComments.length === 0 ? <div></div> : <h3>Comments</h3> }
        {postComments.map(comment =>
          <Post key={comment.id} post={comment} voteScore={comment.voteScore} comment={true} />
        )}
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={addPostModal}
          onRequestClose={this.closePostModal}
          contentLabel='Modal'
        >
          <div>Modal content</div>
        </Modal>
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
