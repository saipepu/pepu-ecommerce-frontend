import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_INIT, CREATE_PRODUCT_SUCCESS, FETCH_PRODUCT_FAIL, FETCH_PRODUCT_INIT, FETCH_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_INIT, UPDATE_PRODUCT_SUCCESS } from "./actionConstant"

const initialState = {
  products: null,
  isLoading: false,
  error: null
}

export const productReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_PRODUCT_INIT: {
      return {
        ...state,
        isLoading: true
      }
    }
    case FETCH_PRODUCT_SUCCESS: {
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        error: null
      }
    }
    case FETCH_PRODUCT_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case CREATE_PRODUCT_INIT: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case CREATE_PRODUCT_SUCCESS: {
      let { message } = state.products;
      console.log(message);
      message?.push(action.payload.message);
      return {
        ...state,
        isLoading: false,
        error: false,
        products: {...state.products, message: message}
      }
    }
    case CREATE_PRODUCT_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case UPDATE_PRODUCT_INIT: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case UPDATE_PRODUCT_SUCCESS: {
      let { message } = state.products
      message = message.map(item => item._id == action.payload.message._id ? action.payload.message : item)
      return {
        ...state,
        isLoading: false,
        products: {...state.products, message: message},
        error: false
      }
    }
    case UPDATE_PRODUCT_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload

      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}