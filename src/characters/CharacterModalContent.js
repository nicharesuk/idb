import React, { Component } from 'react';
// import './CharacterDetails.css';
import PropTypes from 'prop-types';
import ModalDetails from '../shared/ModalDetails';

class CharacterDetails extends Component {

  render() {
    return <ModalDetails />
  }
}

CharacterDetails.propTypes = {
  dataObject: PropTypes.object,
  onChangeContent: PropTypes.func,
}

export default CharacterDetails;
