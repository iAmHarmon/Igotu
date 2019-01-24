import * as types from '../constants/actionTypes';


const initialState = {
  input: '',
  returnObjArr : [],
  loading: false
};


const addItemReducer = ( state = initialState, action) => {
    switch(action.type){
        case types.FETCHING_ITEMS:
        return {
            ...state, loading : true,
        };
        case types.RETURNED_ITEMS:
        return {
            ...state, returnObjArr: action.payload, loading : false
        };
        case types.GET_SEARCH_INPUT: 
        return {
            ...state, input: action.payload
        };
        default:
         return state;      
    }
};

export default addItemReducer;
