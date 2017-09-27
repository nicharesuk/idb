import React, { Component } from 'react';
import './ThumbnailPage.css';
import ThumbnailCard from './ThumbnailCard';
import PropTypes from 'prop-types';

class ThumbnailPage extends Component {
  render() {
    return (
      <div className="thumbnailPageContainer">
        {this.props.data.map((show, index) => (
          <ThumbnailCard
            title={show.title}
            imageURL={show.imageURL}
            year={show.year}
            units={show.units}
            isManga={this.props.isManga}
            key={`thumbnail-component-${index}`}/>
        ))}
      </div>
    );
  }
}

ThumbnailPage.propTypes = {
  isManga: PropTypes.bool,
  data: PropTypes.array,
}

export default ThumbnailPage;
