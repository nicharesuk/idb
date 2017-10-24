import React, { Component } from 'react';
// import './PersonDetails.css';
import PropTypes from 'prop-types';
import ModalDetails from '../shared/ModalDetails';

class PersonDetails extends Component {

  render() {
    return <ModalDetails />
  }
}

PersonDetails.propTypes = {
  dataObject: PropTypes.object,
  onChangeContent: PropTypes.func,
}

export default PersonDetails;
