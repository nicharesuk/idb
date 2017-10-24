import React, { Component } from 'react';
// import './MangaDetails.css';
import PropTypes from 'prop-types';
import ModalDetails from '../shared/ModalDetails';

class MangaDetails extends Component {

  render() {
    return <ModalDetails />
  }
}

MangaDetails.propTypes = {
  dataObject: PropTypes.object,
  onChangeContent: PropTypes.func,
}

export default MangaDetails;
