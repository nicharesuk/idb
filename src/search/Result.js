import React, { Component } from 'react';
import styles from './Result.scss';
import { Image } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';

// Maybe use this?
// http://fusejs.io/

const MAX_CHARACTERS = 100;
const MAX_RESULTS = 3;

const typeColors = {
  animes: "#ff5144",
  characters: "#dc73ff",
  mangas: "#ffe21f",
  actors: "#54c8ff",
}

class Result extends Component {
  state = {
    active: false,
  }

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  sanitizeText = (fullText, index) => {

    const numBelow = Math.ceil((MAX_CHARACTERS - 1) / 2);
    const numAbove = Math.floor((MAX_CHARACTERS - 1) / 2);

    const topLeftover = Math.max(0, numAbove - (fullText.length - index));
    const botLeftover = Math.max(0, numBelow - (index - 1));
    const first = Math.max(0, index - (numBelow + topLeftover));
    const last = Math.min(fullText.length, index + (numAbove + botLeftover));

    let text = fullText.substring(first, last);
    if (first !== 0) {
      text = `...${text}`;
    }
    if (last !== fullText.length) {
      text = `${text}...`;
    }
    return text;
  }

  // Only handles strings, not numbers
  // Only handles one result per attribute
  // Doesn't give preference to one result over another

  render() {
    const { active } = this.state;
    const data = this.props.data;
    const results = [];

    for (const key in data) {
      if (key in this.props.keyNames) {
        const indices = this.props.searchWords.map(w => data[key].toLowerCase().indexOf(w));
        const matches = indices.filter(index => index !== -1);
        if (matches.length) {
          const minIndex = Math.min(...matches);
          const text = this.sanitizeText(data[key], minIndex);
          results.push({
            name: key,
            data: text,
          });
        }
      }
    }

    return (
      <div
        className={styles.container}
        style={{borderRightColor: typeColors[this.props.data.type]}}
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
            <div className={styles.title}>
                <b>
                  {`${this.props.data.title ? this.props.data.title : this.props.data.name}`}
                </b>
            </div>
            {results.slice(0, MAX_RESULTS).map((result, index) => (
              <div
                key={`${result.name}`}
                className={styles.stringContainer}>
                <div>
                  {`${this.props.keyNames[result.name]}:`}
                </div>
                <Highlighter
                  unhighlightClassName={styles.noWrap}
                  activeClassName={styles.noWrap}
                  highlightClassName={styles.noWrap}
                  searchWords={this.props.searchWords}
                  textToHighlight={result.data} />
              </div>
            ))}
          </div>
      </div>
    );
  }
}

Result.propTypes = {
  keyNames: PropTypes.object,
  data: PropTypes.object,
  searchWords: PropTypes.array,
}

export default Result;
