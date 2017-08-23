import React, { Component } from 'react';
import { connect } from 'react-redux';


class PostShow extends Component {

  render() {
    return (
      <div>I am a single post that needs to be shown</div>
    )
  }
}

export default connect()(PostShow);
