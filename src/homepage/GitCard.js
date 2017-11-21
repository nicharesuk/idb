import React from 'react';
import styles from './GitCard.scss';
import PropTypes from 'prop-types';

class GitCard extends React.Component {
  state = {}

  render() {
    return (
      <div className={styles.git_info}>
        {this.props.name}: {this.props.value}
      </div>
    );
  }
}

GitCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string
}

export default GitCard;
