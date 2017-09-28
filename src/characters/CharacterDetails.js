import React, { Component } from 'react';
// import './CharacterDetails.css';
import PropTypes from 'prop-types';
import showData from '../shows/FakeShowData';
import peopleData from '../people/FakePeopleData';

class CharacterDetails extends Component {

  getVoiceActor = () => {
    this.props.dataObject.voiceActors.forEach(actor => {
      peopleData.forEach(person => {
        if (actor.name === person.name) {
          this.props.onChangeContent("people", person);
        }
      });
    });
  }

  getShow = () => {
    this.props.dataObject.animeography.forEach(role => {
      showData.forEach(show => {
        if (role.name === show.title) {
          this.props.onChangeContent("shows", show);
        }
      });
    });
  }

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
