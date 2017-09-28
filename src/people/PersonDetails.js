import React, { Component } from 'react';
// import './PersonDetails.css';
import PropTypes from 'prop-types';
import showData from '../shows/FakeShowData';
import mangaData from '../manga/FakeMangaData';

class PersonDetails extends Component {

  getShow = () => {
    this.props.dataObject.voiceActionRole.forEach(role => {
      showData.forEach(show => {
        if (role.anime.name === show.title) {
          this.props.onChangeContent("shows", show);
        }
      });
    });
  }

  getManga = () => {
    this.props.dataObject.voiceActionRole.forEach(role => {
      mangaData.forEach(manga => {
        if (role.anime.name === manga.title) {
          this.props.onChangeContent("manga", manga);
        }
      });
    });
  }

  render() {
    const { name, birthday, voiceActionRole } = this.props.dataObject;
    return (
      <div>
        <p>
          <a
            style={{cursor: "pointer"}}
            onClick={this.getShow}>
            Link to anime
          </a><br />
          <a
            style={{cursor: "pointer"}}
            onClick={this.getManga}>
            Link to manga
          </a>
        </p>
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
