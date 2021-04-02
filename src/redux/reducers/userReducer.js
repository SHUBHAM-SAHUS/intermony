import { UserActionTypes } from '../actions/UserActions/actionType';

export const initialState = {
  userList: [],
  isLoading: false,
  count: 0
}
let userList = []
let index = 0
export const userReducer = (state = initialState, action) => { 

  switch (action.type) {

    case UserActionTypes.GET_USER_LIST_PENDING:
      return Object.assign({}, state, {
        isLoading: true
      });
    case UserActionTypes.GET_USER_LIST_FULFILLED:
      return Object.assign({}, state, {
        isLoading: false,
        userList: action.payload.users,
        count: action.payload.count
      });

    case UserActionTypes.ADD_USER:
      return {
        ...state,
        userList: ([action.payload.user, ...state.userList])
      };

    case UserActionTypes.FILTER_USERS_FULFILLED:
      return {
        ...state,
        userList: action.payload.users,
        status: "updated_users"
       };
    case UserActionTypes.UPDATE_LIFE_TIME_FULFILLED:
      userList = checkSubscription(state, action)
      return {
       ...state,
        userList: userList,
       };
    
    case UserActionTypes.DELETE_USER_FULFILLED:
      userList = [...state.userList];
      index = userList.findIndex(e => e.id === action.payload);
      userList.splice(index, 1);
      return {
       ...state,
        userList: userList,
       };
  default: return state;
}
}

const checkSubscription = (state, action) => {
    userList = [...state.userList];
    index = userList.findIndex(e => e.id === action.payload);
    if (userList[index].subscription_platform === "admin") userList[index] = {...userList[index],subscription_platform: null, subscription_status: "inactive"};
else userList[index] = {...userList[index], subscription_platform: "admin", subscription_status: "active"};
return userList;
}