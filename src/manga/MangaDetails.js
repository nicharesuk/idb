import React, { Component } from 'react';
// import './MangaDetails.css';
import PropTypes from 'prop-types';

class MangaDetails extends Component {
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

MangaDetails.propTypes = {
  dataObject: PropTypes.object,
  onChangeContent: PropTypes.func,
}

export default MangaDetails;
