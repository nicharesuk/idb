import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ModalDetails.scss';
import ScrollableList from './ScrollableList';
import { Embed, Button } from 'semantic-ui-react';

class ModalDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showTrailer: false
    };

    this.showTrailer = this.showTrailer.bind(this);
    this.hideTrailer = this.hideTrailer.bind(this);
  }

  showTrailer() {
    this.setState({
      showTrailer: true
    });
  }

  hideTrailer() {
    this.setState({
      showTrailer: false
    });
  }

  render() { 
    return (
      <div className={styles.content}>
        <div className={styles.head}>
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
          {this.props.website && this.props.websiteText === "Link to trailer" ?
            <div className={styles.tabs}>
              <Button.Group>
                <Button
                  inverted
                  onClick={this.hideTrailer}>
                  Info
                </Button>
                <Button
                  inverted
                  onClick={this.showTrailer}>
                  Trailer
                </Button>
              </Button.Group>
            </div> :
            null
          }
        </div>
        {this.state.showTrailer === false ?
          <div className={styles.info}>
            <div className={styles.paragraph}>
              {this.props.website && this.props.websiteText === "Link to website" ?
                <div className={styles.link}>
                  <a
                    href={this.props.website}
                    target="_blank">
                    {this.props.websiteText} <br />
                  </a>
                </div> :
                null
              }
              <div>
                {this.props.paragraph}
              </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.listsContainer}>
              {this.props.lists.map(list => (
                <ScrollableList
                  key={list.title}
                  data={list.data}
                  title={list.title}
                  action={list.action} />
              ))}
            </div>
          </div> :
          <Embed id={this.props.website} aspectRatio="16:9" source="youtube"></Embed>

        }
      </div>
    );
  }
}

ModalDetails.defaultProps = {
  title: "",
  detailsList: [],
  paragraph: "",
  websiteText: "",
}

ModalDetails.propTypes = {
  title: PropTypes.string,
  detailsList: PropTypes.array,
  paragraph: PropTypes.string,
  website: PropTypes.string,
  websiteText: PropTypes.string,
  lists: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    action: PropTypes.func,
  })).isRequired,
}

export default ModalDetails;
