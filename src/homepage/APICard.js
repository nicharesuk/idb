import React from 'react';
import styles from './APICard.scss';
import PropTypes from 'prop-types';

class APICard extends React.Component {
  state = {}

  render() {
    return (
      <div className="column">
        <a href={this.props.URL}>
          <p className={styles.api_name}>{this.props.name}</p>
          <p className={styles.api_info}>{this.props.URL}</p>
        </a>
      </div>
    );
  }
}

APICard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  URL: PropTypes.string
}

export default APICard;
