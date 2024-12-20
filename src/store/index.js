import { compose, combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import user from "src/state/user/reducers";

const rootReducer = combineReducers({
  user,
});

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk))
);

export default store;
