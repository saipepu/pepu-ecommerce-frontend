import { SIGN_IN_FAIL, SIGN_IN_INIT, SIGN_IN_SUCCESS, SIGN_UP_FAIL, SIGN_UP_INIT, SIGN_UP_SUCCESS } from "./ActionConstants"

const initialState = {
  userData: null,
  isLoading: false,
  error: null
}

export const signUpReducer = (state = initialState, action) => {
  switch(action.type) {
    case SIGN_UP_INIT: 
    return {
      ...state,
      isLoading: true
    };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        isLoading: false
      };
    case SIGN_UP_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return {
        ...state
      }
  }
}
export const signInReducer = (state = initialState, action) => {
  switch(action.type){
    case SIGN_IN_INIT: {
      return {
        ...state,
        isLoading: true
      }
    };
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        userData: action.payload,
        isLoading: false,
        error: null
      }
    };
    case SIGN_IN_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    };
    default: {
      return {
        ...state
      }
    }
  }
}