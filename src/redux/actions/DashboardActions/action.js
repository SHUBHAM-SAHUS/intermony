
import * as API from 'api/DashboardAPI';

import { DashboardActionTypes } from './actionType';

export const getSummery = (params) => dispatch => dispatch({
  type: DashboardActionTypes.GET_SUMMERY,
  payload: API.getSummery(params)
})

export const playedAnalytics = (params) => dispatch => dispatch({
  type: DashboardActionTypes.PLAYED_ANALYTICS,
  payload: API.playedAnalytics(params)
})
export const favouritesAnalytics = (params) => dispatch => dispatch({
  type: DashboardActionTypes.FAVOURITES_ANALYTICS,
  payload: API.favouritesAnalytics(params)
})
export const downloadsAnalytics = (params) => dispatch => dispatch({
  type: DashboardActionTypes.DOWNLOAD_ANALYTICS,
  payload: API.downloadsAnalytics(params)
})
export const userPlayedPost = (params) => dispatch => dispatch({
  type: DashboardActionTypes.USER_ANALYTICS,
  payload: API.userPlayedPost(params)
})