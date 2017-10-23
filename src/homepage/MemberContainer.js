import React from 'react';
import MemberCard from './MemberCard';
import PropTypes from 'prop-types';

class MemberContainer extends React.Component {
  state = {}

  render() {
    const data = [
      ...this.props.data
    ]
    return (
      <div className="ui three column stackable grid container">
        {data.map((member) => (
          <MemberCard
            key={member.id}
            name={member.name}
            imgURL={member.imgURL}
            role={member.role}
            blurb={member.blurb}
            commits={member.commits}
            unittests={member.unittests}/>
        ))}
      </div>
    );
  }
}

MemberContainer.propTypes = {
  data: PropTypes.array
}

export default MemberContainer;
