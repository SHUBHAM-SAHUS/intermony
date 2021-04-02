import { ConfigActionTypes } from '../actions/ConfigActions/actionType';

export const initialState = {
  configList: {},
  isLoading: false
}

export const configReducer = (state = initialState, action) => {
  //let harmonyList= [];

  switch (action.type) {

    case ConfigActionTypes.GET_CONFIG_PENDING:
      return Object.assign({}, state, {
        isLoading: true,
        configList: {}
      });
    case ConfigActionTypes.GET_CONFIG_FULFILLED:
      return Object.assign({}, state, {
        isLoading: false,
        configList: action.payload
      }); 
    
  default: return state;
}
}