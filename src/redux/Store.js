import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import RootReducer from './RootReducer'

export function configureStore(InitialState) {
  const Store = createStore(RootReducer, InitialState, composeWithDevTools(applyMiddleware(thunk)))
  return Store;
}