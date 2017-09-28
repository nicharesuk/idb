import React, { Component } from 'react';
// import './MangaDetails.css';
import PropTypes from 'prop-types';
import showData from '../shows/FakeShowData';
import characterData from '../characters/FakeCharactersData';

class MangaDetails extends Component {

  getShow = () => {
    showData.forEach(show => {
      if (show.title === this.props.dataObject.title) {
        this.props.onChangeContent("shows", show);
      }
    });
  }

  getCharacter = () => {
    characterData.forEach(character => {
      character.mangaography.forEach(manga => {
        if (manga.name === this.props.dataObject.title) {
          this.props.onChangeContent("characters", character);
        }
      });
    });
  }

  render() {
    const { title, volumes, status, published, score } = this.props.dataObject;
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
            onClick={this.getCharacter}>
            Link to main character
          </a>
        </p>
        <p>
          {`Title: ${title}`}
        </p>
        <p>
          {`Volumes: ${volumes}`}
        </p>
        <p>
          {`Started: ${published}`}
        </p>
        <p>
          {`Status: ${status}`}
        </p>
        <p>
          {`Score: ${score[0]}`}
        </p>
      </div>
    );
  }
}

MangaDetails.propTypes = {
  dataObject: PropTypes.object,
  onChangeContent: PropTypes.func,
}

export default MangaDetails;
