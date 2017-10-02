import React, { Component } from 'react'

class PathError extends Component {

  render() {
    return(
      <div className='row'>
        <div className='col-md-12'>
          <h2>
            HTTP 404 Error - not found!
          </h2>
        </div>
        <div className='col-md-12'>
          Something a little weird happened... we're really sorry about that!  It looks like you tried to find a post that someone deleted!
        </div>
      </div>
    )
  }
}

export default PathError
