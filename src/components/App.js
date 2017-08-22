import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ListPosts from './ListPosts';

class App extends Component {

  render () {

    return (
      <div className='app'>
        <Route path="/" exact render={() =>
          <div>
            <ListPosts />
            <Button bsClass='btn btn-primary'>
              Add a post
            </Button>
          </div>
        } />
      </div>
    )
  }
}

export default connect()(App)
