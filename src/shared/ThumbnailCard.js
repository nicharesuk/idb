import React, { Component } from 'react';
import './ThumbnailCard.css';
import { Image } from 'semantic-ui-react'
import PropTypes from 'prop-types';

class ThumbnailCard extends Component {

  render() {
    return (
      <div className="itemContainer">
        <Image
          width="134px"
          height="196px"
          src={this.props.imageURL} />
        <div className="thumbnailTitle">
          {this.props.title}
        </div>
        <div className="thumbnailYear">
          {this.props.year}
        </div>
      </div>
    );
  }
}

ThumbnailCard.propTypes = {
  title: PropTypes.string,
  imageURL: PropTypes.string,
  year: PropTypes.number,
}

export default ThumbnailCard;
