import React, { Component } from 'react';
// import './CharacterDetails.css';
import PropTypes from 'prop-types';

class CharacterDetails extends Component {
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

CharacterDetails.propTypes = {
  dataObject: PropTypes.object,
  onChangeContent: PropTypes.func,
}

export default CharacterDetails;
