import * as types from "./productActionType";
import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;
const jwtToken = JSON.parse(window.localStorage.getItem("TOKEN"));
console.log("jwt toke: ", jwtToken);
const headers = {
  headers: {
    authorization: `Bearer ${jwtToken}`,
  },
};
// add new product;
const postProductActionFn = (product) => (dispatch) => {
  dispatch({ type: types.ADD_PRODUCT_REQUEST });
  return axios
    .post(`${base_url}/product/add`, product, {
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("TOKEN")),
      },
    })
    .then((res) => {
      return dispatch({ type: types.ADD_PRODUCT_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      return dispatch({
        type: types.ADD_PRODUCT_FAILURE,
        payload: err.response.data,
      });
    });
};

// get list products
const getProductsActionFn =
  (params = {}) =>
  (dispatch) => {
    dispatch({ type: types.GET_PRODUCT_REQUEST });
    return axios(`${base_url}/product/list`, { params })
      .then((res) => {
        return dispatch({
          type: types.GET_PRODUCT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        return dispatch({ type: types.GET_PRODUCT_FAILURE, payload: err });
      });
  };

// get by id
const getProductByIdActionFn = (id) => (dispatch) => {
  dispatch({ type: types.GET_PRODUCT_REQUEST });
  return axios(`${base_url}/product/getById/${id}`)
    .then((res) => {
      return dispatch({
        type: types.GET_PRODUCT_SUCCESS,
        payload: res.data.product,
      });
    })
    .catch((err) => {
      return dispatch({ type: types.GET_PRODUCT_FAILURE });
    });
};
// delete product;
const deleteProductActionFn = (id) => (dispatch) => {
  dispatch({ type: types.DELETE_PRODUCT_REQUEST });
  return axios
    .delete(`${base_url}/product/delete/${id}`, {
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("TOKEN")),
      },
    })
    .then((res) => {
      return dispatch({
        type: types.DELETE_PRODUCT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      return dispatch({ type: types.DELETE_PRODUCT_FAILURE, payload: err });
    });
};
const updateProductActionFn = (id, data) => (dispatch) => {
  dispatch({ type: types.UPDATE_PRODUCT_REQUEST });
  return axios
    .put(`${base_url}/product/update/${id}`, data, {
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("TOKEN")),
      },
    })
    .then((res) => {
      return dispatch({
        type: types.UPDATE_PRODUCT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      return dispatch({ type: types.UPDATE_PRODUCT_FAILURE, payload: err });
    });
};

export {
  getProductsActionFn,
  getProductByIdActionFn,
  postProductActionFn,
  updateProductActionFn,
  deleteProductActionFn,
};
