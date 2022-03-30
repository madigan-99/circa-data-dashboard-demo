import logo from "./logo.svg";
import "./App.css";
import { Emissions } from "./screens/emissions.js";
import { Other } from "./screens/other.js";
import { CarbonLabel } from "./screens/carbon_labels.js";
import Header from "./screens/header.js";
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

function App() {
  const [product, setProduct] = useState(undefined);
  const [show, setShow] = useState(false);
  const [cradeltoGrave, setCradeltoGrave] = useState("1");

  useEffect(() => {
    let temp = process.env.REACT_APP_SERVER + "/getProducts";
    fetch(temp, {
      mode: "cors",
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        setProduct(data[0]);
      });
    });
  }, []);

  return (
    <div className="App">
      <Header
        stateChanger={setProduct}
        show={show}
        setShow={setShow}
        product={product}
        cradeltoGrave={cradeltoGrave}
        setCradeltoGrave={setCradeltoGrave}
      />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Emissions
              show={show}
              setShow={setShow}
              product={product}
              cradeltoGrave={cradeltoGrave}
              setCradeltoGrave={setCradeltoGrave}
            />
          }
        />
        <Route
          path="/other"
          exact
          element={
            <Other
              show={show}
              setShow={setShow}
              product={product}
              cradeltoGrave={cradeltoGrave}
              setCradeltoGrave={setCradeltoGrave}
            />
          }
        />
        <Route
          path="/label"
          exact
          element={
            <CarbonLabel
              show={show}
              setShow={setShow}
              product={product}
              cradeltoGrave={cradeltoGrave}
              setCradeltoGrave={setCradeltoGrave}
            />
          }
        />
      </Routes>
      {/* <FooterComp /> */}
    </div>
  );
}

export default App;
