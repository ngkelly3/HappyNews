import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchCategories, fetchCategoryPosts } from '../actions/index.js';
import Post from './Post.js'

class ListCategories extends Component {

  componentDidMount() {
    const { category } = this.props.match.params;
    // console.log(category);
    this.props.fetchCategoryPosts(category);
    this.props.fetchCategories();
  }

  componentWillReceiveProps() {
    const { category } = this.props.match.params;
    this.props.fetchCategoryPosts(category);
  }

  render() {

    const { categoryPosts } = this.props;
    const { categories } = this.props.categories;
    if (!categoryPosts || !categories) {
      return <div>Loading...</div>
    }

    console.log(categoryPosts);
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
            {categoryPosts.length === 0 ? <div>There are no posts for this category!</div> :
              categoryPosts.map((post) =>
              <Post key={post.id} post={post} voteScore={post.voteScore} comment={false} />
            )}
          </div>
        </div>
      )

  }
}

function mapStateToProps({ categoryPosts, categories }) {
  //console.log("Should toggle on an upvote", posts);
  console.log(categoryPosts);
  return {
    categoryPosts,
    categories,
  }
}

export default withRouter(connect(mapStateToProps, { fetchCategoryPosts, fetchCategories })(ListCategories))
