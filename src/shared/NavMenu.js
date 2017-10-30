import React, { Component } from 'react';
import style from './NavMenu.scss';
import { Menu, Search } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class NavMenu extends Component {

  render() {
    return (
      <div>
        <div className={style.header}>
          <Menu
            inverted
            pointing
            secondary
            size='large'>
            {this.props.pages.map(page => {
              return (
                <Link key={page.name} to={page.link}>
                  <Menu.Item
                    as='div'
                    active={page.link === "/" ? window.location.href.endsWith("/#/") : window.location.href.includes(page.link)}>
                    {page.name}
                  </Menu.Item>
                </Link>
              );
            })}
          </Menu>
        </div>
        <div
          className={style.search}>
          <Search size="mini" showNoResults={false} />
        </div>
      </div>
    );
  }
}

NavMenu.defaultProps = {
  filters: [],
  sorts: [],
}

NavMenu.propTypes = {
  filters: PropTypes.array,
  sorts: PropTypes.array,
  pages: PropTypes.array.isRequired,
}

export default NavMenu;
