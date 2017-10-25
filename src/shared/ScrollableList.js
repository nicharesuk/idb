import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ScrollableList.scss';


class ModalContent extends Component {

  render() {
    if (this.props.data.length === 0) {
      return null;
    }
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          {this.props.title}
        </div>
        <div className={styles.content}>
          {this.props.data.map((element, index) => {
            const color = index % 2 === 0 ? "#1f2025" : "transparent";
            return (
              <div
                key={element}
                onClick={() => this.props.action(index)}
                style={{backgroundColor: color}}
                className={styles.element}>
                {element}
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

ModalContent.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  action: PropTypes.func,
}

export default ModalContent;
