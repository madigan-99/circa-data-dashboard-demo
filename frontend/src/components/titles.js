import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { Nav, SideNav, Title } from "../screens/styles/styles";
import { Modal, Button } from "react-bootstrap";
import "../screens/styles/style.css";

// https://forum.freecodecamp.org/t/newline-in-react-string-solved/68484

export default function Titles(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function NewlineText(props) {
    const text = props.text;
    return text.split("\n").map((str) => <p>{str}</p>);
  }
  return (
    <Title>
      <h1>{props.title}</h1>
      <FontAwesomeIcon
        icon={faQuestionCircle}
        onClick={handleShow}
        className="more-text-icon"
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title bsPrefix="custom-title">{props.modal_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body bsPrefix="custom-font">
          <NewlineText text={props.modal_description}></NewlineText>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Title>
  );
}
