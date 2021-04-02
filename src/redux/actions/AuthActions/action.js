import axios from 'config';
import * as API from 'api';
import storage from 'utils/storage';

import { AuthActionTypes } from './actionType';


export const login = ({body}) => dispatch => {
    return dispatch({
        type: AuthActionTypes.LOGIN,
        payload: API.login(body).then(res => {
            axios.defaults.headers.common["Authorization"] = `Bearer ${res.token}`;
            return res
        })
})
};

export const signup = ({body}) => dispatch => dispatch({
   type: AuthActionTypes.SIGNUP,
   payload: API.signup(body)
       .then(response => {
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
           return response;
       })
});
//
export const forgotPassword = (body) => dispatch => dispatch({
       type: AuthActionTypes.FORGOT_PASSWORD,
       payload: API.forgotPassword(body)
   });

export const resetPassword = (body) => dispatch => dispatch({
   type: AuthActionTypes.RESET_PASSWORD,
   payload: API.resetPassword(body)
       .then(response => {
           return response
       })
});
export const refreshToken = (credentials) => dispatch => dispatch({
   type: AuthActionTypes.REFRESH_TOKEN,
   payload: API.refreshToken(credentials)
       .then(response => {
           axios.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
           return response
       })
});

export const authorizeUser = (user_profile) => {
    console.log("authorize:" + user_profile.access_token);
    console.log("user:" + user_profile);

    storage.set('token', user_profile.access_token);
    storage.set('refresh_token', user_profile.refresh_token);
    storage.set('user', user_profile);


    const token = user_profile.access_token;
    const refresh_token = user_profile.refresh_token;

    return {
        type: AuthActionTypes.AUTHORIZE,
        payload: {
            token,
            user_profile,
            refresh_token
        }
    }
};

export const logout = () => {

    storage.remove('inharmony_authToken');
    storage.remove('inharmony_user');
    storage.remove('inharmony_refresh_token');
    storage.remove('step');
    //window.location.replace("/");
    return {
        type: AuthActionTypes.LOGOUT,
    }
};

//export const updateUserProfile = ({body, id}) => dispatch => dispatch({
//    type: AuthActionTypes.UPDATE_USER,
//    payload: API.updateUser(body, id)
//});
//export const getImageAccess = (params) => dispatch => dispatch({
//    type: AuthActionTypes.GET_IMAGE_ACCESS,
//    payload: API.getImageAccess(params)
//});
//
//export const gitDetailsAccess = ({body}) => dispatch => dispatch({
//    type: AuthActionTypes.GIT_DETAILS,
//    payload: API.gitDetailsAccess(body)
//});