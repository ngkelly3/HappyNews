import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import Modal from 'react-modal';
import ListPosts from './ListPosts';
import PostShow from './PostShow';
import PostNew from './PostNew';

class App extends Component {

  render () {

    return (
      <div className='app'>
        <Switch>
          <Route path="/post/new" component={PostNew} />
          <Route path="/:id" component={PostShow} />
          <Route path="/" exact render={() =>
            <div>
              <ListPosts />
              <Link to="/post/new" className='btn btn-primary'>
                Add a post
              </Link>
            </div>
          }/>
        </Switch>
      </div>
    )
  }
}

export default connect(null, null, null, {pure: false})(App)
