import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

  render() {
    return(
      <form onSubmit={() => {}}>
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

export default reduxForm({
  form: 'PostsNewForm'
})(
  connect()(PostNew)
);
