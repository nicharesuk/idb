import React from 'react';
import ToolCard from './ToolCard';
import PropTypes from 'prop-types';

class ToolContainer extends React.Component {
	state = {}

	render() {
		const data = [
			...this.props.data
		]
		return (
			<div className="ui four column stackable grid container">
				{data.map((tool) => (
					<ToolCard
						key={tool.id}
						name={tool.name}
						imgURL={tool.imgURL}
						info={tool.info}/>
				))}
			</div>
		);
	}
}

ToolContainer.propTypes = {
	data: PropTypes.array
}

export default ToolContainer;
