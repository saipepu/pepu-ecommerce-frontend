import { API } from "../../config"
import { CREATE_CATEGORY_FAIL, CREATE_CATEGORY_INIT, CREATE_CATEGORY_SUCCESS, FETCH_ALL_CATEGORY_FAIL, FETCH_ALL_CATEGORY_INIT, FETCH_ALL_CATEGORY_SUCCESS, FETCH_CATEGORY_FAIL, FETCH_CATEGORY_INIT, FETCH_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAIL, UPDATE_CATEGORY_INIT, UPDATE_CATEGORY_SUCCESS } from "./actionConstant"

export const fetchAllCategory = () => async(dispatch) => {
  console.log('fetch all category')
  dispatch({
    type: FETCH_ALL_CATEGORY_INIT
  })
  const res = await fetch(`${API}/category/list`, {
    method: "GET",
  }).then(response => {
    return response.json()
  }).catch(err => {
    console.log(err)
  })
  console.log(res);
  if(res.getCategoryListSuccess) {
    dispatch({
      type: FETCH_ALL_CATEGORY_SUCCESS,
      payload: res
    })
  } else {
    dispatch({
      type: FETCH_ALL_CATEGORY_FAIL,
      payload: res
    })
  }
}

export const fetchCategory = () => async(dispatch) => {
  console.log('fetch category action')
  dispatch({
    type: FETCH_CATEGORY_INIT
  })
  const res = await fetch(`${API}/category/sortlist`, {
    method: "GET",
    headers: {
      accepted: "application/json"
    }
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err)
  })
  console.log(res);
  if(res?.getCategoryListSuccess){
    dispatch({
      type: FETCH_CATEGORY_SUCCESS,
      payload: res
    })
  } else {
    dispatch({
      type: FETCH_CATEGORY_FAIL,
      payload: res
    })
  }
}

export const createCategory = (values) => async(dispatch) => {
  console.log(values, 'create category action')
  dispatch({
    type: CREATE_CATEGORY_INIT
  })
  const res = await fetch(`${API}/category/create`, {
    method: "POST",
    headers: {
      accepted: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err)
  })
  if(res?.createCategorySuccess){
    dispatch({
      type: CREATE_CATEGORY_SUCCESS,
      payload: res
    })
  } else {
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload: res
    })
  }
}

export const editCategory = (values,id) => async(dispatch) => {
  console.log(values, 'editing category')
  dispatch({
    type: UPDATE_CATEGORY_INIT
  })
  const res = await fetch(`${API}/category/update/${id}`, {
    method: "POST",
    headers: {
      accepted: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err)
  })
  if(res?.updateCategorySuccess){
    console.log(res);
    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: res
    })
  } else {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: res
    })
  }
}