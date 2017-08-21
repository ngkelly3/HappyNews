import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index.js';

class App extends Component {

  state = {

  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render () {
    return (
      <div>
        Hello world!
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps, { fetchPosts })(App)
