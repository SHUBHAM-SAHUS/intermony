//import axios from 'config';
import * as API from 'api/UserAPI';

import { UserActionTypes } from './actionType';

export const getUserList = (params) => dispatch => dispatch({
    type: UserActionTypes.GET_USER_LIST,
    payload: API.getUserList(params)
});

export const createUser = async ({ body,  dispatch }) =>
  dispatch({
    type: UserActionTypes.ADD_USER,
    payload: await API.createUsers(body)
  });

export const filterUsers = async ({ body, dispatch }) =>
  dispatch({
    type: UserActionTypes.FILTER_USERS_FULFILLED,
    payload: await API.filterUsers(body)
  });

export const toggleLifetime = (body, id) => dispatch => dispatch({
  type: UserActionTypes.UPDATE_LIFE_TIME,
  payload: API.updateLifetime(body, id).then(res => id)
});

export const deleteUser = (id) => dispatch => dispatch({
  type: UserActionTypes.DELETE_USER,
  payload: API.deleteUser(id).then(res => id)
});
export const resendPassword = (params) => dispatch => dispatch({
  type: UserActionTypes.RESEND_PASSWORD,
  payload: API.resendPassword(params).then(res => params)
});