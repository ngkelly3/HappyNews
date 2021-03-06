import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, fetchCategories, fetchCategoryPosts, sortPostsScore, sortPostsTime } from '../actions/index.js';
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

  onClickSortScore() {
    this.props.sortPostsScore(this.props.posts)
  }

  onClickSortTime() {
    this.props.sortPostsTime(this.props.posts)
  }

  render() {

    const { posts } = this.props;
    const { categories } = this.props.categories;
    if (!posts || !categories) {
      return <div>Loading...</div>
    }

      return (
        <div className='nav-padding'>
          <div className='row'>
            <div className='col-md-12'>
              <div onClick={this.onClickSortScore.bind(this)} className='nav-item btn navbar-btn btn-primary'>Sort by Votes</div>
              <div onClick={this.onClickSortTime.bind(this)} className='nav-item btn navbar-btn btn-primary'>Sort by Most Recent</div>
            </div>
          </div>
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
            <Post key={post.id} post={post} voteScore={post.voteScore} commentCount={post.commentCount} comment={false} />
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

export default connect(mapStateToProps,
  { fetchPosts,
    fetchCategories,
    fetchCategoryPosts,
    sortPostsScore,
    sortPostsTime })(ListPosts)
