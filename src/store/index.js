import { compose, combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import user from "src/state/user/reducers";
import org from "src/state/org/reducers";
import roles from "src/state/role/reducers";
import policy from "src/state/policy/reducers";
import department from "src/state/department/reducers";
const rootReducer = combineReducers({
  user,
  org,
  roles,
  policy,
  department,
});

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk)),
);

export default store;
