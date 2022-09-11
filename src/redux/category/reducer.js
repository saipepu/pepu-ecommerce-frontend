import { CREATE_CATEGORY_FAIL, CREATE_CATEGORY_INIT, CREATE_CATEGORY_SUCCESS, FETCH_ALL_CATEGORY_FAIL, FETCH_ALL_CATEGORY_INIT, FETCH_ALL_CATEGORY_SUCCESS, FETCH_CATEGORY_FAIL, FETCH_CATEGORY_INIT, FETCH_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAIL, UPDATE_CATEGORY_INIT, UPDATE_CATEGORY_SUCCESS } from "./actionConstant"

const initialState = {
  categories: null,
  isLoading: false,
  error: false,
}

export const categoryReducer = (state = initialState, action) => {
  console.log(action.payload)
  switch(action.type) {
    case FETCH_CATEGORY_INIT:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
        error: null
      }
    case FETCH_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case CREATE_CATEGORY_INIT: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case CREATE_CATEGORY_SUCCESS: {
      let { message } = state.categories;
      console.log(message);
      message.push(action.payload.message)
      console.log(message);
      return {
        ...state,
        isLoading: false,
        categories: { ...state.categories, message: message}
      }
    }
    case CREATE_CATEGORY_FAIL: {
      return {
        ...state,
        isLoading: false,
        categories: action.payload
      }
    }
    case UPDATE_CATEGORY_INIT: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case UPDATE_CATEGORY_SUCCESS: {
      let { message } = state.categories;
      console.log(message);
      message = message.map((item,index) => item._id == action.payload.message._id ? action.payload.message : item)
      console.log(message);
      return {
        ...state,
        isLoading: false,
        categories: { ...state.categories, message: message}
      }
    }
    case UPDATE_CATEGORY_FAIL: {
      return {
        ...state,
        isLoading: false,
        categories: action.payload
      }
    }
    default:
      return {
        ...state,
      }
  }
}

const initialStateAll = {
  allCategories: null,
  isLoading: false,
  error: false,
}
export const allCategoryReducer = (state = initialStateAll, action) => {
  switch(action.type) {
    case FETCH_ALL_CATEGORY_INIT:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case FETCH_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allCategories: action.payload,
        error: null
      }
    case FETCH_ALL_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default: {
      return {
        ...state
      }
    }
  }
}