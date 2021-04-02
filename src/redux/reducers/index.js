import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { harmonyReducer } from './harmonyReducer';
import { configReducer } from './configReducer';
import { userReducer } from './userReducer';
import { dashboardReducer } from './dashboardReducer';
import { couponCodeReducer } from './CouponCodeReducer';

const reducers = combineReducers({
        authReducer,
        harmonyReducer,
        configReducer,
        userReducer,
        dashboardReducer,
        couponCodeReducer
});

export default reducers;
