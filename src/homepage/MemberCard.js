import React from 'react';
import styles from './MemberCard.scss';
import PropTypes from 'prop-types';

class MemberCard extends React.Component {
  state = {}

  render() {
    return (
      <div className="column">
        <img className={styles.img_member} src={this.props.imgURL} alt={this.props.name}></img>
        <p className={styles.member_name}>{this.props.name}</p>
        <div className={styles.member_role}>{this.props.role}</div>
        <p className={styles.member_blurb}>{this.props.blurb}</p>
				<p className={styles.member_responsibilities}>Major Responsibilities: {this.props.responsibilities}</p>
				<div className={styles.member_responsibilities}>Commits: {this.props.commits}</div>
				<div className={styles.member_responsibilities}>Issues: {this.props.issues}</div>
        <div className={styles.member_responsibilities}>Unit tests: {this.props.unittests}</div>
      </div>
    );
  }
}

MemberCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  imgURL: PropTypes.string,
  role: PropTypes.string,
  blurb: PropTypes.string,
	responsibilities: PropTypes.string,
  commits: PropTypes.string,
	issues: PropTypes.string,
  unittests: PropTypes.string
}

export default MemberCard;
