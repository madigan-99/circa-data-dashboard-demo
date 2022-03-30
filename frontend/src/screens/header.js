import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./styles/header.css";
import Plot from "react-plotly.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Nav, HeaderItem } from "./styles/styles";
import Menu from "./menu";

export default function Header(props) {
  // const [show, setShow] = useState(false);
  const handleClick = () => {
    props.setShow(!props.show);
  };
  return (
    <>
      <Nav>
        <HeaderItem>
          <FontAwesomeIcon icon={faBars} onClick={handleClick} />
          <NavLink to="/">
            <h1> {process.env.REACT_APP_CLIENT} </h1>
          </NavLink>
        </HeaderItem>
        <HeaderItem>
          <h2>{props.product ? props.product : ""}</h2>
        </HeaderItem>

        <HeaderItem>
          <img src="circa-logo.png" />
        </HeaderItem>
      </Nav>
      <Menu
        stateChanger={props.stateChanger}
        show={props.show}
        handleClick={handleClick}
        cradeltoGrave={props.cradeltoGrave}
        setCradeltoGrave={props.setCradeltoGrave}
      />
      {/* <MenuProvider MenuComponent={Menu} animation="push"></MenuProvider> */}
    </>
  );
}
