import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import Reducer from "./reducer";
import thunk from "redux-thunk";


const storeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    state: Reducer
  })
  storeEnhancers(applyMiddleware(thunk));
);

export default store;
