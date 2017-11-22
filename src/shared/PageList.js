import React, { Component } from 'react';
import styles from './PageList.scss';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

// TODO: Fix the fact that there can be a LOT of pages and it will break styling

const MAX_SHOWING = 10;

class PageList extends Component {

  render() {
    const { currentPage, maxPage } = this.props;

    const numBelow = Math.ceil((MAX_SHOWING - 1) / 2);
    const numAbove = Math.floor((MAX_SHOWING - 1) / 2);

    const topLeftover = Math.max(0, numAbove - (maxPage - currentPage));
    const botLeftover = Math.max(0, numBelow - (currentPage - 1));
    const first = Math.max(1, currentPage - (numBelow + topLeftover));
    const last = Math.min(maxPage, currentPage + (numAbove + botLeftover));

    const itemList = [];
    if (first !== 1) {
      itemList.push({
        name: 'First',
        page: 1,
      });
    }
    if (currentPage !== 1) {
      itemList.push({
        name: '<<',
        page: currentPage - 1,
      });
    }
    for (let i = first; i <= last; i++) {
      itemList.push({
        name: `${i}`,
        page: i,
      });
    }
    if (currentPage !== maxPage) {
      itemList.push({
        name: '>>',
        page: currentPage + 1,
      });
    }
    if (last !== maxPage) {
      itemList.push({
        name: 'Last',
        page: maxPage,
      });
    }
    return (
      <div className={styles.detailContainer}>
          {itemList.map((item, index) => (
            <div key={item.name} className={styles.detailContainer}>
              <div className={styles.button}>
                <Button
                  active={item.name === `${currentPage}`}
                  onClick={() => this.props.changePage(item.page)}
                  inverted
                  size="mini"
                  circular>
                  {item.name}
                </Button>
              </div>
            </div>   
          ))}
      </div>
    );
  }
}

PageList.propTypes = {
  currentPage: PropTypes.number,
  maxPage: PropTypes.number,
  changePage: PropTypes.func,
}

export default PageList;
