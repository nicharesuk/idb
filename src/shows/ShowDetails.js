import React, { Component } from 'react';
// import './ShowDetails.css';
import PropTypes from 'prop-types';

class ShowDetails extends Component {

  getManga = () => {}

  getPerson = () => {}

  render() {
    const { title, num_episodes, status, year, score } = this.props.dataObject;
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
          {`Length: ${num_episodes} episodes`}
        </p>
        <p>
          {`Aired: ${year}`}
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

ShowDetails.propTypes = {
  dataObject: PropTypes.object,
  onChangeContent: PropTypes.func,
}

export default ShowDetails;
