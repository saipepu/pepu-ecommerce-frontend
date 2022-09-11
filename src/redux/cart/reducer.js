import { ADD_CART_FAIL, ADD_CART_INIT, ADD_CART_SUCCESS, DECREASE_Q, FETCH_CART_FAIL, FETCH_CART_INIT, FETCH_CART_SUCCESS, INCREASE_Q, REMOVE_CART_FAIL, REMOVE_CART_INIT, REMOVE_CART_SUCCESS } from "./actionConstant";

const initialState = {
  carts: [],
  isLoading: false,
  error: false
}

export const cartReducer = (state = initialState, action) => {
  console.log(action.payload, 'here');
  switch(action.type){
    case ADD_CART_INIT: {
      return {
        ...state,
        isLoading: true,
        error: false
      }
    };
    case ADD_CART_SUCCESS: {
      let carts = state.carts;
      if(carts.length > 0) {
        let count = 0;
        for(let i=0; i<carts.length; i++) {
          if(carts[i].id == action.payload.id) {
            carts[i] = action.payload
            count++
            console.log(count);
          }
        }
        if(count == 0){
          count = 0;
          carts.push(action.payload)
        }
      } else {
        carts.push(action.payload)
      }
      console.log(carts);

      return {
        ...state,
        carts: carts,
        isLoading: true,
        error: false
      }
    };
    case ADD_CART_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    };
    case REMOVE_CART_INIT: {
      return {
        ...state,
        isLoading: true,
        error: false
      }
    };
    case REMOVE_CART_SUCCESS: {
      let list = state.carts
      list = list.filter(item => item.id !== action.payload);
      return {
        carts: list,
        isLoading: false,
        error: false
      }
    };
    case REMOVE_CART_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    };
    case INCREASE_Q: {
      let carts = state.carts;
      carts = carts.map(item => item.id == action.payload ? {...item, quantity: item.quantity + 1} : item)
      console.log(carts);
      return {
        ...state,
        carts: carts,
        isLoading: false,
        error: false
      }
    };
    case DECREASE_Q: {
      let carts = state.carts;
      carts = carts.map(item => item.id == action.payload ? {...item, quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity} : item)
      console.log(carts);
      return {
        ...state,
        carts: carts,
        isLoading: false,
        error: false
      }
    };
    default: {
      return {
        ...state,
      }
    }
  }
}

export default cartReducer;