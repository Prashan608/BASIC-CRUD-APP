import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { bookReducer } from "./reducer/bookReducer";

const store = createStore(
  bookReducer,
  applyMiddleware(thunk)
);

export default store;