import React, { Component } from 'react';
import styles from './ThumbnailCard.scss';
import { Image } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import ReactStars from 'react-stars'

class ThumbnailCard extends Component {
  state = {}

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  render() {
    const { active } = this.state
    return (
      <div className={styles.container} onMouseEnter={this.handleShow} onMouseLeave={this.handleHide}>
        <div className={styles.relative}>
          <Image
            className={active ? (this.props.score !== -1 ? styles.dim : styles.outline) : ""}
            bordered={active}
            width="134px"
            height="196px"
            shape="rounded"
            src={this.props.picture} />
          {this.props.score !== -1 && this.props.score !== null ?
            <div
              style={{visibility: active ? "visible" : "hidden"}}
              className={styles.absolute}>
              <ReactStars
                size={25}
                edit={false}
                value={this.props.score / 2.0} />
              <div className={styles.rating}>
                {`${Math.round(this.props.score * 10) / 10}/10`}
              </div>
            </div> : null
          }
        </div>
        <div className={styles.title}>
          {this.props.title}
        </div>
        <div className={styles.subInfo}>
          <div className={styles.sub}>
            {this.props.subInfo_1}
          </div>
          <div className={styles.sub}>
            {this.props.subInfo_2 || null}
          </div>
        </div>
      </div>
    );
  }
}

ThumbnailCard.defaultProps = {
  title: "",
  score: -1,
  picture: "",
  subInfo_1: "",
  subInfo_2: "",
}

ThumbnailCard.propTypes = {
  title: PropTypes.string,
  score: PropTypes.number,
  picture: PropTypes.string,
  subInfo_1: PropTypes.string,
  subInfo_2: PropTypes.string,
}

export default ThumbnailCard;
