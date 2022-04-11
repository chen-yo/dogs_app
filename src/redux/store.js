import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer } from './reducers/appReducer'

const initialState = {
  dogs: new Map(),
  status: "idle",
};

const middleware = [thunk];

export const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
