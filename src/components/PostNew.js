import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { createPost } from '../actions';

class PostNew extends Component {

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

    const { handleSubmit } = this.props;

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

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  withRouter(connect(null, { createPost })(PostNew)
));
