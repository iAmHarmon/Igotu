import * as types from '../constants/actionTypes';

const initialState = {
  locationBox: '',
  currentLocation: 90291
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOCATION_BOX_CHANGE:
      return {
        ...state,
        locationBox: action.payload
      };
    case types.LOCATION_SET:
      return {
        ...state,
        currentLocation: action.payload
      };
    default:
      return state;
  }
};

export default locationReducer;
