import { signUpReducer, signInReducer } from "./user/Reducer";
import { combineReducers } from "redux";
import { categoryReducer } from "./category/reducer";
import { productReducer } from "./product/Reducer";
import { allCategoryReducer } from "./category/reducer";
import cartReducer from "./cart/reducer";

const RootReducer = combineReducers({
  signUpReducer,
  signInReducer,
  categoryReducer,
  allCategoryReducer,
  productReducer,
  cartReducer
})

export default RootReducer;