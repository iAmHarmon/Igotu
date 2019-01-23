/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import Card from '../components/Card.jsx';

const uuid = require('uuid/v1');

const CardsContainer = props => {
  console.log('here are the props inside CardsContainer ', props);

  const createCard = item => {
    console.log('in create card for: ', item.item_name);
    return <Card key={uuid()} info={item} />;
  };

  const cards = props.items.map(createCard);

  let Loading;

  if (props.fetchFlag) {
    Loading = (
      <div className="cardgrid">
        {/* <div className="col-3"> */}
        <button
          className="animated loading center loading-white loading-right white"
          id="loadButton"
        >
          Loading Data
        </button>
      </div>
    );
  }

  return (
    <div className="cardgrid">
      {Loading}
      {cards}
    </div>
  );
};

export default CardsContainer;
