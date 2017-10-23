import React from 'react';
import APICard from './APICard';
import PropTypes from 'prop-types';

class APIContainer extends React.Component {
	state = {}

	render() {
		const data = [
			...this.props.data
		]
		return (
			<div className="ui two column stackable grid container">
				{data.map((api) => (
					<APICard
						name={api.name}
						URL={api.URL}/>
				))}
			</div>
		);
	}
}

APIContainer.propTypes = {
	data: PropTypes.array
}

export default APIContainer;
