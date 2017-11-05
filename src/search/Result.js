import React, { Component } from 'react';
import styles from './Result.scss';
import { Image } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';

// Maybe use this?
// http://fusejs.io/

const CONTEXT_PADDING = 100;

class Result extends Component {
  state = {
    active: false,
  }

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  // Only handles strings, not numbers
  // Only handles one result per attribute
  // Adds '...' on everything regardless if it is the full text
  // Need to 'trim'

  render() {
    const { active } = this.state;
    const data = this.props.data;
    const strings = [];
    const searchText = this.props.searchText.toLowerCase();
    for(const key in data) {
      if (typeof data[key] === 'string') {
        const index = data[key].toLowerCase().indexOf(searchText);
        if(index !== -1) {
          const low  = Math.max(0, index - CONTEXT_PADDING);
          const high = Math.min(data[key].length, index + this.props.searchText.length + CONTEXT_PADDING);
          strings.push(`...${data[key].substring(low, high)}...`);
        }
      }
    }
    return (
      <div
        className={styles.container}
        onMouseEnter={this.handleShow}
        onMouseLeave={this.handleHide}>
          <Image
            className={active ? styles.dim : ""}
            bordered={active}
            width="134px"
            height="196px"
            shape="rounded"
            src={this.props.data.picture} />
          <div className={styles.strings}>
            {strings.map(string => (
              <div
                key={string}
                className={styles.stringContainer}>
                <Highlighter
                  searchWords={[this.props.searchText]}
                  textToHighlight={string} />
              </div>
            ))}
          </div>
      </div>
    );
  }
}

Result.propTypes = {
  data: PropTypes.object,
  searchText: PropTypes.string,
}

export default Result;
