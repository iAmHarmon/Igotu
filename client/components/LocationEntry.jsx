import React from 'react';

const LocationEntry = props => {
  const handleChange = e => {
    props.locationBoxChange(e.target.value);
  };
  console.log('LocationProps', props);
  return (
    <div className="input-control">
      <input
        type="search"
        className="input-small"
        placeholder="location"
        onChange={handleChange}
        onSubmit={() => {
          props.setLocation(props.location.locationBox);
        }}
      />
    </div>
  );
};

export default LocationEntry;
