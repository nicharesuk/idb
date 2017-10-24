import React, { Component } from 'react';
// import './PersonDetails.css';
import PropTypes from 'prop-types';

class PersonDetails extends Component {

  getShow = () => {}

  getManga = () => {}

  render() {
    const { name, birthday, characters } = this.props.dataObject;
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
          {characters.data.map(character => (
            <div key={`${character.id}`}>{`${character.id}`}<br /></div>))}
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
