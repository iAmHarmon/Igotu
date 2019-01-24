import { combineReducers } from 'redux';

import cardsReducer from './cardsReducer';
import addItemReducer from './addItemReducer.js';
import locationReducer from './locationReducer';
// import searchReducer from './searchReducer';

const reducers = combineReducers({
  cards: cardsReducer,
  addItem: addItemReducer,
  location: locationReducer
  // search: searchReducer
});

export default reducers;
