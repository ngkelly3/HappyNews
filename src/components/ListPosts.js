import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, fetchCategories } from '../actions/index.js';
import Post from './Post.js'

class ListPosts extends Component {

  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }

  render() {

    const { posts } = this.props;
    const { categories } = this.props.categories;
    if (!posts || !categories) {
      return <div>Loading...</div>
    }

    //const { category } = this.props.match.params;
      return (
        <div className='nav-padding'>
          <div className='col-md-12'>
            <h2>Categories</h2>
            {
              categories.map((category) =>
                <Link className='btn btn-info btn-lg' to={`/${category.name}`} key={category.name}>{category.name}</Link>)
            }
          </div>
          <div className='col-md-12'>
            <h2>Posts</h2>
            {posts.map((post) =>
              <Post key={post.id} post={post} voteScore={post.voteScore} comment={false} />
            )}
          </div>
        </div>
      )

  }
}

function mapStateToProps({ posts, categories }) {
  //console.log("Should toggle on an upvote", posts);
  return {
    posts,
    categories
  }
}

export default connect(mapStateToProps, { fetchPosts, fetchCategories })(ListPosts)
