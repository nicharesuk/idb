import React from 'react';
import DocumentationCard from './DocumentationCard.js';
import PropTypes from 'prop-types';

class DocumentationContainer extends React.Component {
  state = {}

  render() {
    const data = [
      ...this.props.data
    ]
    return (
      <div>
        {data.map((stats) => (
          <DocumentationCard
            key={stats.id}
            name={stats.name}
            URL={stats.URL}/>
          ))}
      </div>
    );
  }
}

DocumentationContainer.propTypes = {
  data: PropTypes.array
}

export default DocumentationContainer;
