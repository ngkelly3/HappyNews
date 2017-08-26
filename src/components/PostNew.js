import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from 'redux-form';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { createPost, fetchPost } from '../actions';

class PostNew extends Component {

  componentDidMount() {
      const { id } = this.props.match.params;

      if (id) {
        this.props.fetchPost(id);
        //this.handleInitialize();
      }
  }

  handleInitialize() {

    console.log("I am initializing form data")
    const { id, category  } = this.props.match.params;
    // console.log(this.props.post);

    if (id) {

      const { title, category, body } = this.props.post;

      const initData = {
        title,
        category,
        body
      };

      this.props.initialize(initData);
    }
  }

    renderField(field) {

      const { meta: { touched, error } } = field;
      const className = `form-group ${touched && error ? 'has-danger' : ''}`
      return (
        <div className={className}>
          <label>{field.label}</label>
          <input
            className='form-control'
            type="text"
            {...field.input}
          />
          <div className='text-help'>
            {touched ? error : ''}
          </div>
        </div>
      );
    }

  onSubmit(values) {
    console.log("Submission of a post")
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {

    const { handleSubmit, post, id } = this.props
    // if (!post) {
    //   return <div></div>
    // }

    // this.handleInitialize();

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Category"
          name="category"
          component={this.renderField}
        />
        <Field
          label="Body"
          name="body"
          component={this.renderField}
        />
        <ButtonGroup>
          <Button type='submit' className='btn btn-primary'>Submit</Button>
          <Link to='/' className='btn btn-danger'>Cancel</Link>
        </ButtonGroup>
      </form>
    )
  }

}

function mapStateToProps({ activePost }, ownProps) {

  const { title, category, body } = activePost;
  console.log(activePost)

  return {
    initialValues: {
      title,
      category,
      body
    }
  }

}

// called whenever user tries to submit a form
function validate(values) {
  const errors = {};

  // Validate the inputs from 'values' - empty errors object means form is fine
  if (!values.title || values.title.length < 3) {
    errors.title = "Enter a title that is at least 3 characters!";
  }
  if (!values.category) {
    errors.category = "Enter some categories";
  }
  if (!values.body) {
    errors.body = "Enter some content please";
  }

  return errors;
}

PostNew = reduxForm({
  validate,
  form: 'PostNew',
  enableReinitialize: true
})(PostNew);

PostNew = withRouter(connect(mapStateToProps, { fetchPost, createPost })(PostNew))

export default PostNew;
