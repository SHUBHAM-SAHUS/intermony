// Hashtag api
import * as codeAPI from "api/CouponCodeAPI";

import { CouponCodeActionType } from "./CouponCodeActionType";

export const getCouponCodes = ({body}) =>  dispatch =>
  dispatch({
    type: CouponCodeActionType.GET_COUPON_CODE,
    payload: codeAPI.getCouponCodes(body)
  });
  export const getCouponCodesDynamic = ({body}) =>  dispatch =>
  dispatch({
    type: CouponCodeActionType.GET_COUPON_CODE,
    payload: codeAPI.getCouponCodesDynamic(body)
  });

export const createCouponCodeDynamic = ({ body} ) =>  dispatch =>
    dispatch({
    type: CouponCodeActionType.ADD_COUPON_CODE,
    payload: codeAPI.createCouponCodeDynamic(body)
  });
  export const createCouponCode = ({ body} ) =>  dispatch =>
    dispatch({
    type: CouponCodeActionType.ADD_COUPON_CODE,
    payload: codeAPI.createCouponCode(body)
  });
  export const toggleCouponCode = ({ body, id} ) =>  dispatch =>
    dispatch({
    type: CouponCodeActionType.TOGGLE_COUPON_CODE,
    payload: codeAPI.toggleCouponCode(body, id)
  });