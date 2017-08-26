import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from 'redux-form';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { createComment } from '../actions';

class CommentNew extends Component {

  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const initData = {
      body: 'body'
    };

    this.props.initialize(initData);
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

  onCommentSubmit(values) {
    const { id, category } = this.props.match.params;
    console.log("The parent id of this post is ", id);
    this.props.createComment(values, id, () => {
      this.props.history.push(`/${category}/${id}`);
    });
  }

  render() {

    const { handleSubmit } = this.props;
    const { id } = this.props.match.params;
    return(
      <form onSubmit={handleSubmit(this.onCommentSubmit.bind(this))}>
        <Field
          label="Body"
          name="body"
          component={this.renderField}
        />
        <ButtonGroup>
          <Button type='submit' className='btn btn-primary'>Submit</Button>
          <Link to={`/${id}`} className='btn btn-danger'>Cancel</Link>
        </ButtonGroup>
      </form>
    )
  }

}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: {
      body: 'body'
    }
  }
}

// called whenever user tries to submit a form
function validate(values) {
  const errors = {};

  // Validate the inputs from 'values' - empty errors object means form is fine
  if (!values.body) {
    errors.body = "Enter some content please";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createComment })(CommentNew)
);
