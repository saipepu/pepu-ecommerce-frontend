import { API } from "../../config"
import { SIGN_IN_FAIL, SIGN_IN_INIT, SIGN_IN_SUCCESS, SIGN_UP_FAIL, SIGN_UP_INIT, SIGN_UP_SUCCESS } from "./ActionConstants"

export const signup = (values) => async (dispatch)=> {
  console.log(values, 'signup action')
  dispatch({
    type: SIGN_UP_INIT
  })
  let res = await fetch(`${API}/admin/signup`, {
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
    console.log(err);
  })
  if (res.signupSuccess) {
    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: res
    })
    return 'hi'
  } else {
    dispatch({
      type: SIGN_UP_FAIL,
      payload: res
    })
  }
}

export const signin = (values) => async (dispatch) => {
  console.log(values, 'signin action')
  dispatch({
    type: SIGN_IN_INIT
  })
  let res = await fetch(`${API}/admin/signin`, {
    method: "POST",
    headers: {
      accepted: 'application/json',
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(values)
  })
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log(err)
  })
  if (res.signinSuccess){
    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: res
    })
  } else {
    dispatch({
      type: SIGN_IN_FAIL,
      payload: res
    })
  }
}