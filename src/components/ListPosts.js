import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, fetchCategories, fetchCategoryPosts } from '../actions/index.js';
import Post from './Post.js'

class ListPosts extends Component {

  componentDidMount() {
    const { category } = this.props.match.params;
    if (!category) {
      this.props.fetchPosts();
    } else {
      this.props.fetchCategoryPosts(category);
    }
    this.props.fetchCategories();
  }

  componentWillReceiveProps() {
    const { category } = this.props.match.params;
    if (!category) {
      this.props.fetchPosts();
    } else {
      this.props.fetchCategoryPosts(category);
    }
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
          <div className='row'>
            <div className='col-md-12'>
              <h2>Categories</h2>
            </div>
          </div>
          <div className='row'>
            {categories.map((category) =>
                <div key={category.name} className='col-md-4'>
                <Link className='btn btn-info btn-lg btn-block' to={`/${category.name}`} key={category.name}>{category.name}</Link>
                </div>)}
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <h2>Posts</h2>
            </div>
          </div>
          {posts.length === 0 ? <div>There are no posts for this category!</div> :
            posts.map((post) =>
            <Post key={post.id} post={post} voteScore={post.voteScore} comment={false} />
          )}
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

export default connect(mapStateToProps, { fetchPosts, fetchCategories, fetchCategoryPosts })(ListPosts)
