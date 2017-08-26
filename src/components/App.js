import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import { Navbar, NavItem, NavbarHeader, Nav }  from 'react-bootstrap';
import ListPosts from './ListPosts';
import PostShow from './PostShow';
import PostNew from './PostNew';
import CommentNew from './CommentNew';

class App extends Component {

  render () {

    return (
      <div className='app'>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Home</Link>
              </Navbar.Brand>
          </Navbar.Header>
            <Nav>
              <NavItem eventKey={1} href="#">Link</NavItem>
            </Nav>
        </Navbar>
        <Switch>
          <Route path="/post/new/" component={PostNew} />
          <Route path="/post/edit/:category/:id" component={PostNew} />
          <Route path="/comment/edit/:category/:commentId/:parentId" component={CommentNew} />
          <Route path="/comment/new/:category/:parentId" component={CommentNew} />
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
