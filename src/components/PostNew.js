import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList'
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { createPost, fetchPost, editPost } from '../actions';
import 'react-widgets/dist/css/react-widgets.css'

class PostNew extends Component {

  componentDidMount() {
      const { id } = this.props.match.params;
      // console.log ("Testing value of id", id);
      if (id) {
        this.props.fetchPost(id);
      }
  }

    renderField(field) {

      const { meta: { touched, error } } = field;
      const className = `form-group ${touched && error ? 'has-danger' : ''}`
      return (
        <div className={className}>
          <label>{field.label}</label>
          {
            field.label === "Body" ?
             <textarea
              className='form-control'
              type="text"
              rows="5"
              {...field.input}
            /> :
            <input
              className='form-control'
              type="text"
              {...field.input}
            />
          }
          <div className='text-help'>
            {touched ? error : ''}
          </div>
        </div>
      );
    }

    renderCategory(field) {

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
    // console.log("Submission of a post")
    const { id, category } = this.props.match.params;
    if ( !id ) {
      this.props.createPost(values, () => {
        this.props.history.push('/');
      })
    } else {
      this.props.editPost(values, id, () => {
        this.props.history.push(`/${category}/${id}`);
      })
    }
  }

  render() {

    const { handleSubmit } = this.props
    const colors = [ { color: 'Red', value: 'ff0000' },
  { color: 'Green', value: '00ff00' },
  { color: 'Blue', value: '0000ff' } ]


    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <label>Category</label>
        <Field
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
  const { id } = ownProps.match.params;
  console.log(activePost)

  if (id) {
    return {
      initialValues: {
        title,
        category,
        body
      }
    }
  } else {
    return {
      initialValues: {
        title: "",
        category: "",
        body: ""
      }
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

PostNew = withRouter(connect(mapStateToProps, { fetchPost, createPost, editPost })(PostNew))

export default PostNew;
