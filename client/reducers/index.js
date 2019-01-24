import { combineReducers } from 'redux';

import cardsReducer from './cardsReducer';

import addItemReducer from './addItemReducer.js';
// import searchReducer from './searchReducer';

const reducers = combineReducers({
  cards: cardsReducer,
  addItem: addItemReducer
  // search: searchReducer
});

export default reducers;
