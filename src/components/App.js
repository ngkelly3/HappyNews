import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListPosts from './ListPosts';

class App extends Component {

  render () {

    return (
      <div>
        <ListPosts />
      </div>
    )
  }
}

export default connect()(App)
