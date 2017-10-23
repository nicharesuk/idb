import React, { Component } from 'react';
// import './CharacterDetails.css';
import PropTypes from 'prop-types';

class CharacterDetails extends Component {

  getVoiceActor = () => {}

  getShow = () => {}

  render() {
    return (
      <div>
        <p>
          <a
            style={{cursor: "pointer"}}
            onClick={this.getVoiceActor}>
            Link to voice actor
          </a><br />
          <a
            style={{cursor: "pointer"}}
            onClick={this.getShow}>
            Link to anime
          </a>
        </p>
        <p>
          {`${this.props.dataObject.about.substr(0, 1000).concat('...')}`}
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
