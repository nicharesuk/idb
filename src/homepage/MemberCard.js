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
				<p className={styles.member_info}>{this.props.role}</p>
				<p className={styles.member_info}>{this.props.blurb}</p>
				<p className={styles.member_info}>{this.props.commits}</p>
				<p className={styles.member_info}>{this.props.issues}</p>
				<p className={styles.member_info}>{this.props.unittests}</p>
			</div>
		);
	}
}

MemberCard.propTypes = {
	name: PropTypes.string,
	imgURL: PropTypes.string,
	role: PropTypes.string,
	blurb: PropTypes.string,
	commits: PropTypes.string,
	issues: PropTypes.string,
	unittests: PropTypes.string
}

export default MemberCard;
