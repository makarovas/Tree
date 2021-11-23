import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { FETCH_DATA, FETCH_DATA_ERROR, IS_DATA_LOADING } from "./types";

const initialState = {
  root: {},
  typeRoot: {},
  loading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        loading: false,
        root: action.payload.root,
        typeRoot: action.payload.typeRoot,
      };
    case FETCH_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case IS_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
