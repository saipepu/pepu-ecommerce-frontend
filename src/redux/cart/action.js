import { ADD_CART_FAIL, ADD_CART_INIT, ADD_CART_SUCCESS, DECREASE_Q, FETCH_CART_FAIL, FETCH_CART_INIT, FETCH_CART_SUCCESS, INCREASE_Q, REMOVE_CART_FAIL, REMOVE_CART_INIT, REMOVE_CART_SUCCESS } from "./actionConstant";


export const fetchAllCart = () => {

}

export const addToCart = (value) => async (dispatch) => {
  console.log(value);
  dispatch({
    type: ADD_CART_INIT
  })
  if(value){
    dispatch({
      type: ADD_CART_SUCCESS,
      payload: { ...value, quantity: 1}
    })
  } else {
    dispatch({
      type: ADD_CART_FAIL,
      payload: value
    })
  }
}

export const removeFromCart = (value) => async (dispatch) => {
  console.log(value);
  dispatch({
    type: REMOVE_CART_INIT
  })
  if(value){
    dispatch({
      type: REMOVE_CART_SUCCESS,
      payload: value
    })
  } else {
    dispatch({
      type: REMOVE_CART_FAIL,
      payload: value
    })
  }
}

export const increaseQ = (value) => async (dispatch) => {
  if(value){
    dispatch({
      type: INCREASE_Q,
      payload: value
    })
  } else {
    console.log('no id')
  }
}
export const decreaseQ = (value) => async (dispatch) => {
  if(value){
    dispatch({
      type: DECREASE_Q,
      payload: value
    })
  } else {
    console.log('no id')
  }
}