import React, { Component } from 'react';
// import './PersonDetails.css';
import PropTypes from 'prop-types';

class PersonDetails extends Component {
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

PersonDetails.propTypes = {
  dataObject: PropTypes.object,
  onChangeContent: PropTypes.func,
}

export default PersonDetails;
