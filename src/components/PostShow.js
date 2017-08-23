import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/index.js';

class PostShow extends Component {

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  render() {

    const { post } = this.props;
    if (!post) {
      return <div>Loading...</div>
    }

    return (
      <div>{post.title}</div>
    )
  }
}

function mapStateToProps({ activePost }, ownProps) {

  console.log(activePost);
  return (
    {
      post: activePost
    }
  )
}

export default connect(mapStateToProps, { fetchPost })(PostShow);
