import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
//import { store } from './app/store'
//import { Provider } from 'react-redux'
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import "bootswatch/dist/lumen/bootstrap.min.css";
import dotenv from "dotenv";
import Nav from "./components/Nav/Nav";
dotenv.config();


// con el provider y store  
//  <Provider store={store}></Provider>-
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
       <App />
     </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
