import { DashboardActionTypes } from '../actions/DashboardActions/actionType';

export const initialState = {
  summery: {},
  played: null,
  favourites: null,
  downloads: null,
  user_played:null,
  isLoading: false,
  count: 0
}

export const dashboardReducer = (state = initialState, action) => {
  //let harmonyList= [];

  switch (action.type) {

    case DashboardActionTypes.GET_SUMMERY_PENDING:
      return Object.assign({}, state, {
        isLoading: true,
        played: null,
        favourites: null,
        downloads: null,
        configList: {}
      });
    case DashboardActionTypes.GET_SUMMERY_FULFILLED:
      return Object.assign({}, state, {
        isLoading: false,
        summery: action.payload
      });
    case DashboardActionTypes.PLAYED_ANALYTICS_PENDING:
      return Object.assign({}, state, {
        isLoading: true
      });
    case DashboardActionTypes.PLAYED_ANALYTICS_FULFILLED:
        delete action.payload.success;
      return Object.assign({}, state, {
        isLoading: false,
        played: action.payload
      });
    case DashboardActionTypes.FAVOURITES_ANALYTICS_PENDING:
      return Object.assign({}, state, {
        isLoading: true
      });
    case DashboardActionTypes.FAVOURITES_ANALYTICS_FULFILLED:
        delete action.payload.success;
      return Object.assign({}, state, {
        isLoading: false,
        favourites: action.payload
      });

    case DashboardActionTypes.DOWNLOAD_ANALYTICS_PENDING:
      return Object.assign({}, state, {
        isLoading: true
      });
    case DashboardActionTypes.DOWNLOAD_ANALYTICS_FULFILLED:
        delete action.payload.success;
      return Object.assign({}, state, {
        isLoading: false,
        downloads: action.payload
      });
      case DashboardActionTypes.USER_ANALYTICS_PENDING:
        return Object.assign({}, state, {
          isLoading: true
        });
      case DashboardActionTypes.USER_ANALYTICS_FULFILLED:      
        delete action.payload.success;
      return Object.assign({}, state, {
        isLoading: false,
        user_played: action.payload.played,
        count: action.payload.count
      });

    default: return state;
  }
}