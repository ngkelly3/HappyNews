import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import Modal from 'react-modal';
import ListPosts from './ListPosts';
import PostShow from './PostShow';
import PostNew from './PostNew';
import CommentNew from './CommentNew';

class App extends Component {

  render () {

    return (
      <div className='app'>
        <Switch>
          <Route path="/post/new" component={PostNew} />
          <Route path="/comment/new/:id" component={CommentNew} />
          <Route path="/:category/:id" component={PostShow} />
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
