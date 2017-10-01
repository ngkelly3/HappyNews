import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import { Navbar }  from 'react-bootstrap';
import ListPosts from './ListPosts';
import PostShow from './PostShow';
import PostNew from './PostNew';
import CommentNew from './CommentNew';
import PathError from './PathError';

class App extends Component {

  render () {

    return (
      <div className='app'>
        <Switch>
          <Route exact path="/notfound" component={PathError} />
          <Route path="/" component={() => (
            <div>
              <Navbar default collapseOnSelect fixedTop>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="/">Home</a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Link className='nav-item btn navbar-btn btn-primary pull-right' to="/post/new">Add a Post</Link>
              </Navbar>
              <Switch>
                <Route path="/notfound" component={PathError} />
                <Route path="/post/new/" component={PostNew} />
                <Route path="/post/edit/:category/:id" component={PostNew} />
                <Route path="/comment/edit/:category/:commentId/:parentId" component={CommentNew} />
                <Route path="/comment/new/:category/:parentId" component={CommentNew} />
                <Route path="/:category/:id" component={PostShow} />
                <Route path="/:category" component={ListPosts} />
                <Route path="/" component={ListPosts} />
              </Switch>
            </div>
          )} />
        </Switch>
      </div>
    )
  }
}

export default connect(null, null, null, {pure: false})(App)
