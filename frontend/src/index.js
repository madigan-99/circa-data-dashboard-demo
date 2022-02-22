import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuProvider from "react-flexible-sliding-menu";
import { BrowserRouter } from "react-router-dom";
import Menu from "./screens/menu.js";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      {/* <MenuProvider MenuComponent={Menu} animation="push"> */}
      <App />

      {/* </MenuProvider> */}
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
