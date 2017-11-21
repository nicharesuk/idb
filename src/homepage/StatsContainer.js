import React from 'react';
import gitdata from './GitData.js';
import GitContainer from './GitContainer';
import documentationdata from './DocumentationData.js';
import DocumentationContainer from './DocumentationContainer.js';

class StatsContainer extends React.Component {
  state = {}

  render() {
    return (
      <div>
        <GitContainer data={gitdata.map(git => {
          return {
            ...git
          }
        })}/>
        <DocumentationContainer data={documentationdata.map(documentation => {
          return {
            ...documentation
          }
        })}/>
      </div>
    );
  }
}

export default StatsContainer;
