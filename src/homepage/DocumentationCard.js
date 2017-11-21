import React from 'react';
import styles from './DocumentationCard.scss';
import PropTypes from 'prop-types';

class DocumentationCard extends React.Component {
  state = {}

  render() {
    return (
      <div className={styles.documentation_info}>
        <a href={this.props.URL}>{this.props.name}</a>
      </div>
    );
  }
}

DocumentationCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  URL: PropTypes.string
}

export default DocumentationCard;
