import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome';
import WelcomeBody from "./WelcomeBody";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";

import App from "./App";
// import reducer from "./reducers";
// import { getSocket } from "./socket";
// const store = createStore(
//     reducer,
//     composeWithDevTools(applyMiddleware(reduxPromise))
// );
let component;

if (location.pathname == '/welcome') {
    component = <Welcome />;
}
else {
    component = <App />;
}

ReactDOM.render(
    component,
    document.querySelector('main')
);
