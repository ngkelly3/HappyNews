import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index.js';
import ListPosts from './ListPosts';

class App extends Component {

  componentDidMount() {
    this.props.fetchPosts();
  }

  render () {
    const { posts } = this.props

    return (
      <div>
        <ListPosts />
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  console.log(posts);
  return {
    posts: posts
  }
}

export default connect(mapStateToProps, { fetchPosts })(App)
