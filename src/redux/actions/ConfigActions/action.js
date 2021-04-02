//import axios from 'config';
import * as API from 'api/HarmonyAPI';

import { ConfigActionTypes } from './actionType';

export const getConfigList = (params) => dispatch => dispatch({
    type: ConfigActionTypes.GET_CONFIG,
    payload: API.getConfigList(params)
});

