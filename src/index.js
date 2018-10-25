import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
//below imports are not 3rd party modules
import App from "./components/App";
import store from "./stores";
//import registerServiceWorker from "./registerServiceWorker";

//load the initial/global stylesheet
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
//registerServiceWorker();
