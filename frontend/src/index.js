import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "./fonts/Karla/Karla-VariableFont_wght.ttf";
import "./fonts/Karla/Karla-Italic-VariableFont_wght.ttf";
import "./fonts/PPNeueMachina-Bold v1.2/PPNeueMachina-Bold.ttf";
import "./fonts/PPNeueMachina-Light v1.2/PPNeueMachina-Light.ttf";

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
