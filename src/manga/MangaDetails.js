import React, { Component } from 'react';
// import './MangaDetails.css';
import PropTypes from 'prop-types';

class MangaDetails extends Component {
  render() {
    const { title, volumes, status, published, score } = this.props.dataObject;
    return (
      <div>
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
