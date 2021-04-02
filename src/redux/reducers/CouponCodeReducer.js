import { CouponCodeActionType } from "redux/actions/CouponCodeActions/CouponCodeActionType";

const couponcodesInitialState = {
  couponcodeList: [],
  status: "init",
  count: 1
};


const couponCodeReducer = (state = couponcodesInitialState, action) => {
  switch (action.type) {
    case CouponCodeActionType.GET_COUPON_CODE_PENDING:
      return  state
    case CouponCodeActionType.GET_COUPON_CODE_FULFILLED:
      return {
        ...state,
        couponcodeList: action.payload.coupons,
         count: parseInt(action.payload.count),
        status: "added"
      };
    
    case CouponCodeActionType.ADD_COUPON_CODE:
      return {
        ...state,
        couponcodeList: [action.payload, ...state.couponcodeList],
        status: "init"
      };  
      case CouponCodeActionType.TOGGLE_COUPON_CODE_FULFILLED:
        let couponcodeList = [...state.couponcodeList];
        let index = state.couponcodeList.findIndex(e => e.id === action.payload.coupon.id);
        couponcodeList[index] = action.payload.coupon;
      return {
        ...state,
        couponcodeList
      };  

    default:
      return state;
  }
};

export { couponCodeReducer, couponcodesInitialState };
