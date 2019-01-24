import React from 'react';

const LocationEntry = props => {
  const handleChange = e => {
    props.locationBoxChange(e.target.value);
  };
  console.log('LocationProps', props);
  return (
    <div className="input-control">
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log('submit loc: ', props.location.locationBox);
          props.setLocation(props.location.locationBox);
        }}
        onChange={handleChange}
      >
        <input type="textbox" className="input-small" placeholder="location" />
      </form>
    </div>
  );
};

export default LocationEntry;
