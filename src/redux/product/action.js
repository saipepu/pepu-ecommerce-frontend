import { API } from "../../config"
import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_INIT, CREATE_PRODUCT_SUCCESS, FETCH_PRODUCT_FAIL, FETCH_PRODUCT_INIT, FETCH_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_INIT, UPDATE_PRODUCT_SUCCESS } from "./actionConstant"

export const fetchProduct = () => async (dispatch) => {
  console.log('start fetching product action')
  dispatch({
    type: FETCH_PRODUCT_INIT
  })
  const res = await fetch(`${API}/product/list`, {
    method: "GET",
    headers: {
      accepted: 'application/json'
    }
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
  if(res.getProductListSuccess) {
    dispatch({
      type: FETCH_PRODUCT_SUCCESS,
      payload: res
    })
  } else {
    dispatch({
      type: FETCH_PRODUCT_FAIL,
      payload: res
    })
  }
}

export const createProduct = (values) => async (dispatch) => {
  console.log(values, 'creating product action')
  dispatch({
    type: CREATE_PRODUCT_INIT
  })
  const res = await fetch(`${API}/product/create`, {
    method: "POST",
    body: values
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
  console.log(res)
  if(res.createProductSuccess) {
    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: res
    })
  } else {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: res
    })
  }
}

export const updateProduct = (values,id) => async (dispatch) => {
  console.log(values, 'creating product action')
  dispatch({
    type: UPDATE_PRODUCT_INIT
  })
  const res = await fetch(`${API}/product/update/${id}`, {
    method: "PUT",
    body: values
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err);
  })
  console.log(res);
  if(res.updateProductSuccess) {
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: res
    })
  } else {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: res
    })
  }
}