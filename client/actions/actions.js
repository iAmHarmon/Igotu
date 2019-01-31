import * as types from '../constants/actionTypes';
import store from '../store';

export const fetchItemsStart = () => ({
  type: types.GET_ALL_ITEMS_START
});

export const fetchedItems = resp => ({
  type: types.GET_ALL_ITEMS,
  payload: resp
});

export const fetchError = err => ({
  type: types.GET_ALL_ITEMS_ERR,
  payload: err
});

export const searchValueChange = value => ({
  type: types.SEARCH_BOX_CHANGE,
  payload: value
});

export const fetchItemsData = () => dispatch => {
  dispatch(fetchItemsStart());
  console.log('THIS IS STORE!!!!', store);
  fetch(`http://localhost:3000/allItems/?origin=${store.getState().location.currentLocation}`)
    .then(response => response.json())
    .then(data => {
      console.log('we got the items', data);
      dispatch(fetchedItems(data));
    })
    .catch(() => dispatch(fetchError));
};

export const fetchSearchedItems = search => dispatch => {
  dispatch(fetchItemsStart());

  fetch(
    `http://localhost:3000/search/${search}/?origin=${store.getState().location.currentLocation}`
  )
    .then(response => response.json())
    .then(data => {
      console.log('we got the searched items');
      dispatch(fetchedItems(data));
    })
    .catch(() => dispatch(fetchError));
};

export const fetchCategoryItems = category => dispatch => {
  dispatch(fetchItemsStart());

  fetch(
    `http://localhost:3000/category/${category}/?origin=${
      store.getState().location.currentLocation
    }`
  )
    .then(response => response.json())
    .then(data => {
      console.log('we got the category items');
      dispatch(fetchedItems(data));
    })
    .catch(() => dispatch(fetchError));
};

// export const searchStart = query => ({
//   type: types.SEARCH,
//   payload: query
// });

// export const login = data => ({
//   type: types.LOGIN,
//   payload: data
// });

// /////// ADDING ITEM FUNCTIONALITY ////////////

export const getSearchInput = value => ({
  type: types.GET_SEARCH_INPUT,
  payload: value
});

export const fetchingItems = () => ({
  type: types.FETCHING_ITEMS
});

export const returnedItems = resp => ({
  type: types.RETURNED_ITEMS,
  payload: resp
});

export const fetchReturnedItems = search => dispatch => {
  dispatch(fetchingItems());
  console.log('this is search', search);
  fetch(`/checkupcite?val=${search}`)
    .then(response => response.json())
    .then(data => JSON.parse(data))
    .then(bdata => {
      console.log('this is bdata2', bdata.items);
      dispatch(returnedItems(bdata.items));
    })
    .catch(() => dispatch(fetchError));
};

// Location input box actions
export const locationBoxChange = value => ({
  type: types.LOCATION_BOX_CHANGE,
  payload: value
});

export const locationSet = value => ({
  type: types.LOCATION_SET,
  payload: value
});

export const setLocation = value => dispatch => {
  dispatch(locationSet(value));
  dispatch(fetchItemsData());
};
