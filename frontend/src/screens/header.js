import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./styles/header.css";
import Plot from "react-plotly.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { Nav, SideNav, LeftAlign, Center } from "./styles/styles";
import Menu from "./menu";
import MenuProvider from "react-flexible-sliding-menu";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

export default function Header(props) {
  // const [show, setShow] = useState(false);
  const handleClick = () => {
    props.setShow(!props.show);
  };
  return (
    <>
      <Nav>
        <LeftAlign>
          <NavLink to="/">
            <h1> {process.env.REACT_APP_CLIENT} </h1>
          </NavLink>
          <FontAwesomeIcon icon={faBars} onClick={handleClick} />
        </LeftAlign>
        <Center>
          <h2>{props.product ? props.product : ""}</h2>
        </Center>
        <div> &nbsp;</div>
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
