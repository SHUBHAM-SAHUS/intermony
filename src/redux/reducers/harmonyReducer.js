import { HarmonyActionTypes } from '../actions/HarmonyActions/actionType';

export const initialState = {
  harmonyList: [],
  isLoading: false,
  harmonyDetails: {},
  count: 0
}

export const harmonyReducer = (state = initialState, action) => {
  let harmonyList= [];
  let index= 0;

  switch (action.type) {

    case HarmonyActionTypes.GET_HARMONY_LIST_PENDING:
      return Object.assign({}, state, {
        isLoading: true
      });
    case HarmonyActionTypes.GET_HARMONY_LIST_FULFILLED:
      return Object.assign({}, state, {
        isLoading: false,
        harmonyList: action.payload.posts,
        count: action.payload.count
      });
    case HarmonyActionTypes.GET_HARMONY_PENDING:
      return Object.assign({}, state, {
        isLoading: true,
        harmonyDetails: {}
      });
    case HarmonyActionTypes.GET_HARMONY_FULFILLED:
      return Object.assign({}, state, {
        isLoading: false,
        harmonyDetails: action.payload.post
      });
    case HarmonyActionTypes.UPDATE_HARMONY_PENDING:
      return Object.assign({}, state, {
        isLoading: true,
        harmonyList: []
      });
    case HarmonyActionTypes.UPDATE_HARMONY_FULFILLED:
      return Object.assign({}, state, {
        isLoading: false,
        harmonyDetails: null
      });
    case HarmonyActionTypes.CREATE_HARMONY_PENDING:
      return Object.assign({}, state, {
        isLoading: true
      });
    case HarmonyActionTypes.CREATE_HARMONY_FULFILLED:
      harmonyList = [...state.harmonyList];
      index = state.harmonyList.length - 1;
      delete harmonyList[index];
      harmonyList[0] = action.payload.post;
      return Object.assign({}, state, {
        isLoading: false,
        harmonyDetails: null,
        harmonyList
      });
    case HarmonyActionTypes.FEATURED_HARMONY_PENDING:
      return Object.assign({}, state, {
        isLoading: true
      });
    case HarmonyActionTypes.FEATURED_HARMONY_FULFILLED:
      harmonyList = [...state.harmonyList];
      index = harmonyList.findIndex(e => e.id === action.payload.id);
      harmonyList[index].is_featured = action.payload.post.is_featured;
      harmonyList[index].featured_rank = action.payload.post.featured_rank;
      return Object.assign({}, state, {
        isLoading: false,
        harmonyList
      });

      case HarmonyActionTypes.FILTER_POSTS_FULFILLED:
      return {
        ...state,
        harmonyList: action.payload.posts,
        status: "updated_posts",
        count: action.payload.count
      }; 

    case HarmonyActionTypes.DELETE_HARMONY_PENDING:
      return Object.assign({}, state, {
        isLoading: true
      });
    case HarmonyActionTypes.DELETE_HARMONY_FULFILLED:
      let harmonyObject = {...state.harmonyDetails};
      harmonyList = [...state.harmonyList];
  harmonyObject.active_status = harmonyObject.active_status === "active" ? "deleted" : "active";
  harmonyList.splice(harmonyList.findIndex(e => e.id === action.payload), 1);
  return Object.assign({}, state, {
    isLoading: false,
    harmonyDetails: harmonyObject,
    harmonyList: harmonyList
  });
  default: return state;
}
}