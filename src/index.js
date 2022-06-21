import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
// import {AuthProvider} from "./Auth/auth-context"
import { store } from "./store";
import { Provider } from "react-redux";


// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <AuthProvider> */}
      <Provider store={store}>
      <App />
      </Provider>
    {/* </AuthProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
