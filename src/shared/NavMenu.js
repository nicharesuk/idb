import React, { Component } from 'react';
import style from './NavMenu.scss';
import { Menu, Search, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class NavMenu extends Component {

  render() {
    const { filters, sorts, activeSortIndex} = this.props;
    const activeSortText = sorts.length ? sorts[activeSortIndex].name : "";
    const href = window.location.href;
    return (
      <div>
        <div className={style.header}>
          <Menu
            inverted
            secondary
            size='large'>
            {this.props.pages.map(page => {
              return (
                <Link key={page.name} to={page.link}>
                  <Menu.Item
                    as='div'
                    active={href.endsWith(page.link)}>
                    {page.name}
                  </Menu.Item>
                </Link>
              );
            })}
            <Menu.Menu className={style.menu} position="right">
              {filters.map((filter, filterIndex) => {
                const filterText = `${filter.name}: ${filter.values[filter.activeValue].name}`;
                return (
                  <Dropdown key={filterIndex} item text={filterText}>
                    <Dropdown.Menu>
                      {filter.values.map((value, valueIndex) => (
                        <Dropdown.Item
                          key={valueIndex}
                          active={filter.activeValue === valueIndex}
                          onClick={() => this.props.updateFilters(filterIndex, valueIndex)}>
                          {value.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                );
              })}
              {sorts.length ? 
                <Dropdown item text={`Sort by: ${activeSortText}`}>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      active={this.props.ascending}
                      onClick={() => this.props.changeDirection(true)}>
                      Ascending
                    </Dropdown.Item>
                    <Dropdown.Item
                      active={!this.props.ascending}
                      onClick={() => this.props.changeDirection(false)}>
                      Descending
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    {sorts.map((sort, index) => (
                      <Dropdown.Item
                        key={index}
                        active={index === activeSortIndex}
                        onClick={() => this.props.changeSort(index)}>
                        {sort.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown> : null
              }
            </Menu.Menu>
          </Menu>
        </div>
        {this.props.search ? 
          <div
            className={style.search}>
            <form onSubmit={this.props.handleSubmit}>
              <Search
                size="mini"
                value={this.props.searchText}
                onSearchChange={(e) => this.props.updateSearch(e.target.value)}
                showNoResults={false} />
            </form>
          </div> : null
        }
      </div>
    );
  }
}

NavMenu.defaultProps = {
  filters: [],
  sorts: [],
  search: true,
  activeSortIndex: 0,
}

NavMenu.propTypes = {
  filters: PropTypes.array,
  updateFilters: PropTypes.func,
  sorts: PropTypes.array,
  changeSort: PropTypes.func,
  ascending: PropTypes.bool,
  changeDirection: PropTypes.func,
  activeSortIndex: PropTypes.number,
  pages: PropTypes.array.isRequired,
  searchText: PropTypes.string,
  updateSearch: PropTypes.func,
  handleSubmit: PropTypes.func,
  search: PropTypes.bool,
}

export default NavMenu;
