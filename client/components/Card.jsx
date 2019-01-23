import React from 'react';

const styleString = `background-image: url({props.info.photo})`;

const Card = props => {
  console.log('in cards for item', props.info.item_name);
  const styles = { backgroundImage: 'url(' + props.info.photo + ')' };
  return (
    <div className="card col-3">
      <div className="card-container">
        <div className="card-image" style={styles} />
        <div className="title-container">
          <p className="title">{props.info.item_name}</p>
          <span className="subtitle">${props.info.price}</span>
        </div>
      </div>
      <div className="content">
        <p>{props.info.item_details}</p>
      </div>
    </div>
  );
};

export default Card;
