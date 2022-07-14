import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middlewares = [thunk];
const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

let store = createStore(rootReducer,enhancer);

export default store;
