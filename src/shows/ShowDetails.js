import React, { Component } from 'react';
// import './ShowDetails.css';
import PropTypes from 'prop-types';

class ShowDetails extends Component {
  render() {
    return (
      <div>
        <p>
          {`Title:`}
        </p>
        <p>
          {`Length:`}
        </p>
        <p>
          {`Year Started:`}
        </p>
        <p>
          {`Status:`}
        </p>
        <p>
          {`Score:`}
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
