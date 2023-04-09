import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./authReducer/authReducer";
import { productReducer } from "./productReducer/productReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({ authReducer, productReducer });

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
