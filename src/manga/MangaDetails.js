import React, { Component } from 'react';
// import './MangaDetails.css';
import PropTypes from 'prop-types';

class MangaDetails extends Component {

  getShow = () => {}

  getCharacter = () => {}

  render() {
    const { title, num_chapters, status, year, score } = this.props.dataObject;
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
          {`Chapters: ${num_chapters}`}
        </p>
        <p>
          {`Started: ${year}`}
        </p>
        <p>
          {`Status: ${status}`}
        </p>
        <p>
          {`Score: ${score}`}
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
