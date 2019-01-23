import React from 'react';

const styleString = `background-image: url({props.info.photo})`;

const Card = props => {
  console.log('in cards for item', props.info.item_name);
  const styles = { backgroundImage: 'url(' + props.info.photo + ')' };
  return (
    <div className="card col-2">
      <div className="card slide-up">
        <div className="card-container">
          <div className="card-image" style={styles} />
        </div>
        <div className="mobile-title">
          <div className="content">
            <p className="title">{props.info.item_name}</p>
            <p className="subtitle">${props.info.price}</p>
          </div>
        </div>
        <div className="content-body content">
          <p>{props.info.item_details}</p>
        </div>
        <div className="card-footer content">distance and driving data here</div>
      </div>
    </div>
  );
};

// div class="card slide-up">
//     <div class="card-container">
//         <div class="card-image" style="background-image: url(imageurl)"></div>
//     </div>
//     <div class="mobile-title">
//         <div class="content">
//             <p class="title">Kangaroo Valley Safari</p>
//             <p class="subtitle">By John Doe</p>
//         </div>
//     </div>
//     <div class="card-body content">
//         <p>Located two hours south of Sydney in the Southern Highland of New South Wales...</p>
//     </div>
//     <div class="card-footer content">
//         2 min. read 22 comments
//     </div>
// </div>

export default Card;
