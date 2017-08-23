import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ListPosts from './ListPosts';
import PostShow from './PostShow';

class App extends Component {

  render () {

    return (
      <div className='app'>
        <Switch>
          <Route path="/:id" component={PostShow} />
          <Route path="/" exact render={() =>
            <div>
              <ListPosts />
              <Button bsClass='btn btn-primary'>
                Add a post
              </Button>
            </div>
          }/>
        </Switch>
      </div>
    )
  }
}

export default connect(null, null, null, {pure: false})(App)
