import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger"; //in a full app, there would be an environment variable check to see if we need this.

import reducers from "../reducers";
//applyMiddleware for the logger so we can see the state update in the console.
const store = createStore(reducers, applyMiddleware(logger));

export default store;
