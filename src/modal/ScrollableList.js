import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ScrollableList.scss';


class ModalContent extends Component {

  render() {
    if (this.props.data.length === 0) {
      return null;
    }
    const data = this.props.data.map((name, index) => ({name, index}))
      .sort(function(a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          {this.props.title}
        </div>
        <div className={styles.content}>
          {data.map((element, index) => {
            const color = index % 2 === 0 ? "#1f2025" : "transparent";
            return (
              <div
                key={element.name}
                onClick={() => this.props.action(element.index)}
                className={styles.element}
                style={{backgroundColor: color}}>
                <div className={styles.innerElement}>
                  {element.name}
                </div>
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
