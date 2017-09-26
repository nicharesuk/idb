import React, { Component } from 'react';
import './ShowsPage.css';
import ThumbnailCard from '../shared/ThumbnailCard';
import data from './FakeShowData';

class ShowsPage extends Component {
  render() {
    return (
      <div className="showsContainer">
        {data.map((show, index) => (
          <ThumbnailCard
            title={show.title}
            imageURL={show.imageURL}
            year={show.year}
            key={`movie-${index}`}/>
        ))}
      </div>
    );
  }
}

export default ShowsPage;
