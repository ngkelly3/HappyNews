import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index.js';

class App extends Component {

  componentDidMount() {
    this.props.fetchPosts();
  }

  render () {
    const { posts } = this.props

    return (
      <div>
        {Object.keys(posts).map( (key, index) =>
          <div key={key}>
            <p>{posts[key].title}</p>
            <p>{posts[key].author}</p>
          </div>
        )}
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
