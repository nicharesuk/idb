import React, { Component } from 'react';
// import './ShowDetails.css';
import PropTypes from 'prop-types';

class ShowDetails extends Component {
  render() {
    const { title, episodes, status, aired, score } = this.props.dataObject;
    return (
      <div>
        <p>
          {`Title: ${title}`}
        </p>
        <p>
          {`Length: ${episodes} episodes`}
        </p>
        <p>
          {`Aired: ${aired}`}
        </p>
        <p>
          {`Status: ${status}`}
        </p>
        <p>
          {`Score: ${score[0]}`}
        </p>
      </div>
    );
  }
}

ShowDetails.propTypes = {
  dataObject: PropTypes.object,
  onChangeContent: PropTypes.func,
}

export default ShowDetails;
