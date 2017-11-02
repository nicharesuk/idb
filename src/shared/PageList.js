import React, { Component } from 'react';
import styles from './PageList.scss';
import PropTypes from 'prop-types';

class ThumbnailPage extends Component {

  render() {
    const itemList = [{
      name: 'First',
      page: 1,
    }];
    for (let i = 1; i <= this.props.maxPage; i++) {
      itemList.push({
        name: `${i}`,
        page: i,
      });
    }
    itemList.push({
      name: 'Last',
      page: this.props.maxPage,
    });
    return (
      <div className={styles.detailContainer}>
          {itemList.map((item, index) => (
            <div key={item.name} className={styles.detailContainer}>
              <div
                onClick={() => this.props.changePage(item.page)}
                className={item.name === `${this.props.currentPage}` ? styles.current : styles.link}>
                {item.name}
              </div>
              {index !== itemList.length - 1 ?
                <div className={styles.bullet}>
                  •
                </div> :
                null
              }
            </div>   
          ))}
      </div>
    );
  }
}

ThumbnailPage.propTypes = {
  currentPage: PropTypes.number,
  maxPage: PropTypes.number,
  changePage: PropTypes.func,
}

export default ThumbnailPage;
