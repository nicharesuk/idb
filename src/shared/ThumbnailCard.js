import React, { Component } from 'react';
import styles from './ThumbnailCard.scss';
import { Image, Dimmer } from 'semantic-ui-react'
import PropTypes from 'prop-types';

class ThumbnailCard extends Component {
  state = {}

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  render() {
    const { active } = this.state
    return (
      <div className={styles.container} onMouseEnter={this.handleShow} onMouseLeave={this.handleHide}>
        <Dimmer.Dimmable dimmed={active}>
            <Dimmer active={active} >
               {this.props.title}
            </Dimmer>
          <Image
            width="134px"
            height="196px"
            shape="rounded"
            src={this.props.picture} />
        </Dimmer.Dimmable>
        <div className={styles.title}>
          {this.props.title}
        </div>
        <div className={styles.subInfo}>
          <div>
            {this.props.subInfo_1}
          </div>
          <div>
            {this.props.subInfo_2 || null}
          </div>
        </div>
      </div>
    );
  }
}

ThumbnailCard.propTypes = {
  title: PropTypes.string,
  picture: PropTypes.string,
  subInfo_1: PropTypes.string,
  subInfo_2: PropTypes.string,
  isManga: PropTypes.bool,
}

export default ThumbnailCard;
