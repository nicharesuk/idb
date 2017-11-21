import React from 'react';
import GitCard from './GitCard.js';
import PropTypes from 'prop-types';

class GitContainer extends React.Component {
  state = {}

  render() {
    const data = [
      ...this.props.data
    ]
    return (
      <div>
        {data.map((stats) => (
          <GitCard
            key={stats.id}
            name={stats.name}
            value={stats.value}/>
          ))}
      </div>
    );
  }
}

GitContainer.propTypes = {
  data: PropTypes.array
}

export default GitContainer;
