import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Header, Image, Modal } from 'semantic-ui-react';

class ModalContent extends Component {

  render() {
    return (
      <div style={{display: "flex"}}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='https://myanimelist.cdn-dena.com/images/anime/12/76049.jpg' />
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>We've found the following gravatar image associated with your e-mail address.</p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
      </div>
    );
  }
}

export default ModalContent;
