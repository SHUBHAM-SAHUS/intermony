import { AuthActionTypes } from '../actions/AuthActions/actionType';
import storage from 'utils/storage';

const token = storage.get("inharmony_authToken", null);
const refresh_token = storage.get("inharmony_refresh_token", null);
const user = storage.get("inharmony_user", null);

export const initialState = {
    token: token,
    refresh_token: refresh_token,
    user: user,
    isloading: false,
    resetPasswordToken: null
}

const updateObject = (oldState, updatedProps) => {
    return {
        ...oldState,
        ...updatedProps
    }
}
const setUserData = (payload) => {
    storage.set('inharmony_user', payload.user);
    storage.set('inharmony_authToken', payload.token);
    storage.set("inharmony_refresh_token", payload.refresh_token);
};
export const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case AuthActionTypes.LOGIN_PENDING:
            return Object.assign({}, state, {
                isloading: true, disabled: true
            });
        case AuthActionTypes.LOGIN_FULFILLED:
            setUserData(action.payload);
            return Object.assign({}, state, {
                isloading: false, disabled: false, user: action.payload.user, token: action.payload.token, refresh_token: action.payload.refresh_token
            })

         case AuthActionTypes.REFRESH_TOKEN_FULFILLED:
             storage.set('inharmony_authToken', action.payload.token);
             storage.set("inharmony_refresh_token", action.payload.refresh_token);
            return Object.assign({}, state, {
                isloading: false, disabled: false, token:  action.payload.token
            });

        case AuthActionTypes.SIGNUP_PENDING:
            return Object.assign({}, state, {
                isloading: true, disabled: true
            });
        case AuthActionTypes.SIGNUP_FULFILLED:
            setUserData(action.payload);
            return Object.assign({}, state, {
                isloading: false, disabled: false, user: action.payload.data.user, token:  action.payload.data.token
            });

        case AuthActionTypes.FORGOT_PASSWORD_PENDING:
            return Object.assign({}, state, { isloading: true, disabled: true });
        case AuthActionTypes.FORGOT_PASSWORD_FULFILLED:
            return Object.assign({}, state, { isloading: false, disabled: false });

        case AuthActionTypes.RESET_PASSWORD_PENDING:
            return Object.assign({}, state, { isloading: true, disabled: true });
        case AuthActionTypes.RESET_PASSWORD_FULFILLED:
            return Object.assign({}, state, { isloading: false, disabled: false });

        case AuthActionTypes.AUTHORIZE:
            const payload = action.payload;
            const isAdmin = payload.user_profile.role === "superadmin" ? true : false;
            return updateObject(state,
                {
                    token: payload.token,
                    user: payload.user_profile,
                    refresh_token: payload.refresh_token,
                    isAdmin: isAdmin
                });

        case AuthActionTypes.LOGOUT:
            return updateObject(state, {
                token: null,
                refresh_token: null,
                user: null,
                isloading: false,
                isAdmin: false,
                impersonate: false,
            });

        case AuthActionTypes.UPDATE_USER_FULFILLED:
            storage.set('inharmony_user',action.payload.user);
            return updateObject(state, {
                user: action.payload.user
            });
        case AuthActionTypes.GIT_DETAILS_FULFILLED:
            storage.set('inharmony_user',action.payload.user);
            return updateObject(state, {
                user: action.payload.user
            });
        default: return state;
    }
}