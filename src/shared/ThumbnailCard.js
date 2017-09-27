import React, { Component } from 'react';
import './ThumbnailCard.css';
import { Image } from 'semantic-ui-react'
import PropTypes from 'prop-types';

class ThumbnailCard extends Component {

  render() {
    const unitName = this.props.isManga ? "chapters" : "chapters"
    return (
      <div className="thumbnailCardContainer">
        <Image
          width="134px"
          height="196px"
          src={this.props.imageURL} />
        <div className="thumbnailTitle">
          <div>
            {this.props.title}
          </div>
        </div>
        <div className="thumbnailSubInfo">
          <div>
            {this.props.started}
          </div>
          <div>
            {this.props.units ? `${this.props.units} ${unitName}` : null}
          </div>
        </div>
      </div>
    );
  }
}

ThumbnailCard.propTypes = {
  title: PropTypes.string,
  imageURL: PropTypes.string,
  started: PropTypes.string,
  units: PropTypes.number,
  isManga: PropTypes.bool,
}

export default ThumbnailCard;
