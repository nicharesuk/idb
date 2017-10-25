import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ModalDetails.scss';
import ScrollableList from './ScrollableList';

class ModalDetails extends Component {

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.data}>
          <div className={styles.title}>  
            {this.props.title}
          </div>
          <div className={styles.details}>
            {this.props.detailsList.map((detail, index) => (
              <div key={index} className={styles.detailContainer}>
                <div className={styles.detail}>
                  {detail}
                </div>
                {index !== this.props.detailsList.length - 1 ?
                  <div className={styles.detail}>
                    •
                  </div> :
                  null
                }
              </div>   
            ))}
          </div>
          <div className={styles.paragraph}>
            {this.props.website ?
              <div className={styles.link}>
                <a
                  href={this.props.website}
                  target="_blank">
                  {this.props.websiteText} <br />
                </a>
              </div> : null
            }
            <div>
              {this.props.paragraph}
            </div>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.listsContainer}>
          <ScrollableList
            data={this.props.primaryList}
            title={this.props.primaryListTitle}
            action={this.props.primaryListAction} />
          <ScrollableList
            data={this.props.secondaryList}
            title={this.props.secondaryListTitle}
            action={this.props.secondaryListAction} />
        </div>
      </div>
    );
  }
}

ModalDetails.defaultProps = {
  title: "",
  detailsList: [],
  paragraph: "",
  websiteText: "",
  primaryList: [],
  primaryListTitle: "",
  secondaryList: [],
  secondaryListTitle: "",
}

ModalDetails.propTypes = {
  title: PropTypes.string,
  detailsList: PropTypes.array,
  paragraph: PropTypes.string,
  website: PropTypes.string,
  websiteText: PropTypes.string,
  primaryList: PropTypes.array,
  primaryListTitle: PropTypes.string,
  primaryListAction: PropTypes.func,
  secondaryList: PropTypes.array,
  secondaryListTitle: PropTypes.string,
  secondaryListAction: PropTypes.func,
}

export default ModalDetails;
