import React, { Component } from 'react';
// import './ShowDetails.css';
import PropTypes from 'prop-types';
import mangaData from '../manga/FakeMangaData';
import peopleData from '../people/FakePeopleData';

class ShowDetails extends Component {

  getManga = () => {
    mangaData.forEach(manga => {
      if (manga.title === this.props.dataObject.title) {
        this.props.onChangeContent("manga", manga);
      }
    });
  }

  getPerson = () => {
    peopleData.forEach(person => {
      person.voiceActionRole.forEach(role => {
        if (role.anime.name === this.props.dataObject.title) {
          this.props.onChangeContent("people", person);
        }
      });
    });
  }

  render() {
    const { title, episodes, status, aired, score } = this.props.dataObject;
    return (
      <div>
        <p>
          <a
            style={{cursor: "pointer"}}
            onClick={this.getManga}>
            Link to manga
          </a><br />
          <a
            style={{cursor: "pointer"}}
            onClick={this.getPerson}>
            Link to lead voice actor
          </a>
        </p>
        <p>
          {`Title: ${title}`}
        </p>
        <p>
          {`Length: ${episodes} episodes`}
        </p>
        <p>
          {`Aired: ${aired}`}
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

ShowDetails.propTypes = {
  dataObject: PropTypes.object,
  onChangeContent: PropTypes.func,
}

export default ShowDetails;
