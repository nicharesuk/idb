import React from 'react';
import styles from './ToolCard.scss';
import PropTypes from 'prop-types';

class ToolCard extends React.Component {
  state = {}

  render() {
    return (
      <div className="column">
        <a href={this.props.URL}>
          <img className={styles.img_tool} src={this.props.imgURL} alt={this.props.name}></img>
          <p className={styles.tool_name}>{this.props.name}</p>
          <p className={styles.tool_info}>{this.props.info}</p>
        </a>
      </div>
    );
  }
}

ToolCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  imgURL: PropTypes.string,
  info: PropTypes.string,
  URL: PropTypes.string
}

export default ToolCard;
