import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import queryString from 'query-string';

const MAX_SHOWING = 10;

class PageList extends Component {

  render() {
    const maxPage = this.props.maxPage;
    const params = queryString.parse(window.location.search);
    const currentPage = params.page ? parseInt(params.page, 10) : 1;
    // console.log(currentPage);
    // console.log(maxPage);

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
      <Button.Group>
        {itemList.map((item, index) => (
          <Button
            key={item.name}
            active={item.name === `${currentPage}`}
            onClick={() => this.props.changePage(item.page)}
            inverted
            size="mini">
            {item.name}
          </Button>
        ))}
      </Button.Group>
    );
  }
}

PageList.propTypes = {
  maxPage: PropTypes.number,
  changePage: PropTypes.func,
}

export default PageList;
