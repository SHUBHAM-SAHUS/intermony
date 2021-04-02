//import axios from 'config';
import * as API from 'api/HarmonyAPI';

import { HarmonyActionTypes } from './actionType';

export const getHarmonyList = (params) => dispatch => dispatch({
    type: HarmonyActionTypes.GET_HARMONY_LIST,
    payload: API.getHarmonyList(params)
});

export const getHarmony = (id) => dispatch => dispatch({
    type: HarmonyActionTypes.GET_HARMONY,
    payload: API.getHarmony(id)
});

export const deleteHarmony = (id) => dispatch => dispatch({
    type: HarmonyActionTypes.DELETE_HARMONY,
    payload: API.deleteHarmony(id).then(res => id)
});

export const createHarmony = (body) => dispatch => dispatch({
    type: HarmonyActionTypes.CREATE_HARMONY,
    payload: API.createHarmony(body)
});
export const updateHarmony = (body, id) => dispatch => dispatch({
    type: HarmonyActionTypes.UPDATE_HARMONY,
    payload: API.updateHarmony(body, id)
});

export const config = (body) =>   dispatch => dispatch({
  type: HarmonyActionTypes.CONFIG_Harmony,
  payload: API.config(body)
});

export const activateHarmony = (id) => dispatch =>  dispatch({
    type: HarmonyActionTypes.DELETE_HARMONY,
    payload: API.activateHarmony(id).then(res => id)
});
export const deactivateHarmony = (id) => dispatch =>  dispatch({
    type: HarmonyActionTypes.DELETE_HARMONY,
    payload: API.deactivateHarmony(id).then(res => id)
});

export const addFeaturedPost = (body, id) => dispatch =>  dispatch({
    type: HarmonyActionTypes.FEATURED_HARMONY,
    payload: API.addFeaturedPost(body, id).then(res => {return {...body, id}})
});

export const filterPosts = async ({ body, dispatch }) =>
  dispatch({
    type: HarmonyActionTypes.FILTER_POSTS_FULFILLED,
    payload: await API.filterPosts(body)
  });