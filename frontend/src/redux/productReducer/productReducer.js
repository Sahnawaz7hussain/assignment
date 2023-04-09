import * as types from "./productActionType";
let initData = {
  isLoading: false,
  isError: false,
  data: {},
};

export const productReducer = (state = initData, action) => {
  let { type, payload } = action;
  switch (type) {
    case types.GET_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: {},
      };
    case types.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload,
      };
    case types.GET_PRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
      };
    default:
      return state;
  }
};
