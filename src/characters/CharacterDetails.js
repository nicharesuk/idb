import React, { Component } from 'react';
// import './CharacterDetails.css';
import PropTypes from 'prop-types';

class CharacterDetails extends Component {
  render() {
    return (
      <div>
        <p>
          {`${this.props.dataObject.about}`}
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
