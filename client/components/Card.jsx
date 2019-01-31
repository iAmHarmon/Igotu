import React from 'react';

const styleString = `background-image: url({props.info.photo})`;

const Card = props => {
  console.log('in cards for item', props.info.item_name);
  console.log('distance info in card', props.info.distance);
  const styles = { backgroundImage: `url(${props.info.photo})` };
  return (
    <div className="card col-3">
      <div className="card slide-up">
        <div className="card-container">
          <div className="card-image" style={styles} />
        </div>
        <div className="mobile-title">
          <div className="content">
            <p className="title">{props.info.item_name}</p>
            <p className="subtitle">$
{props.info.price.toFixed(2)}
</p>
          </div>
        </div>
        <div className="content-body content">
          <p>{props.info.item_details}</p>
        </div>
        <div className="action-bar center">
          <button className="uppercase ">View Item</button>
        </div>
        <div className="distance-text">
           {props.info.eta} to drive {props.info.distance}
        </div>
      </div>
    </div>
  );
};

export default Card;
