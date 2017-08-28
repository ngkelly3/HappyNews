import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { createComment, fetchComment, editComment } from '../actions';

class CommentNew extends Component {

  componentDidMount() {
      const { commentId } = this.props.match.params;
      console.log ("Testing value of id", commentId);
      if (commentId) {
        this.props.fetchComment(commentId);
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

  onCommentSubmit(values) {
    const { parentId, category, commentId } = this.props.match.params;
    console.log("The parent id of this post is ", parentId);
    if (!commentId) {
      this.props.createComment(values, parentId, () => {
        this.props.history.push(`/${category}/${parentId}`);
      });
    } else {
      this.props.editComment(values, commentId, () => {
        this.props.history.push(`/${category}/${parentId}`);
      });
    }
  }

  render() {

    const { handleSubmit } = this.props;
    let { commentId, category, parentId } = this.props.match.params;

    if (!commentId) {
      commentId = this.props.id;
    }

    if (!parentId) {
      parentId = this.props.id;
    }

    return(
      <form onSubmit={handleSubmit(this.onCommentSubmit.bind(this))}>
        <Field
          label="Body"
          name="body"
          component={this.renderField}
        />
        <ButtonGroup>
          <Button type='submit' className='btn btn-primary'>Submit</Button>
          <Link to={`/${category}/${parentId}`} className='btn btn-danger'>Cancel</Link>
        </ButtonGroup>
      </form>
    )
  }

}

function mapStateToProps({ activeComment }, ownProps) {
  console.log(activeComment);

  const { commentId } = ownProps.match.params;
  const { body } = activeComment;

  if (commentId) {
  return {
    initialValues: {
      body
    }
  }
  } else {
    return {
      initialValues: {
        body: ""
      }
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

CommentNew = reduxForm({
  validate,
  form: 'CommentNew',
  enableReinitialize: true
})(CommentNew);

CommentNew = withRouter(connect(mapStateToProps, { createComment, fetchComment, editComment })(CommentNew))

export default CommentNew;
