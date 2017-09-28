import React, { Component } from 'react';
// import './PersonDetails.css';
import PropTypes from 'prop-types';

class PersonDetails extends Component {
  render() {
    const { name, birthday, voiceActionRole } = this.props.dataObject;
    return (
      <div>
        <p>
          {`Name: ${name}`}
        </p>
        <p>
          {`Birthday: ${birthday}`}
        </p>
        <p>
          {"Published Manga: None"}
        </p>
        <div>
          {"Characters Voice-acted:"}
          {voiceActionRole.map(role => (
            <div key={`${role.anime.name}`}>{`${role.anime.name} - ${role.character.name}`}<br /></div>))}
        </div>
      </div>
    );
  }
}

PersonDetails.propTypes = {
  dataObject: PropTypes.object,
  onChangeContent: PropTypes.func,
}

export default PersonDetails;
