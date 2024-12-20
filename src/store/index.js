import { compose, combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import user from "src/state/user/reducers";
import org from "src/state/org/reducers";

const rootReducer = combineReducers({
  user,
  org,
});

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk)),
);

export default store;
