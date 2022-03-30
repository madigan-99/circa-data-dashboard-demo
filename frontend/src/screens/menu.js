import React, { useContext, useEffect, useState, createContext } from "react";
import { NavLink } from "react-router-dom";
import { MenuContext } from "react-flexible-sliding-menu";
import { Row, MenuDiv, Selector, Label } from "./styles/styles";
import Select from "react-select";
import { Modal, ButtonGroup, ToggleButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import Titles from "../components/titles";
export default function Menu(props) {
  // const { closeMenu } = useContext(MenuContext);

  //https://react-bootstrap.netlify.app/components/buttons/#toggle-button-props
  const [product, selectProduct] = useState("");
  const [options, setOptions] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const radios = [
    { name: "Cradle to Grave", value: "1" },
    { name: "Cradle to Gate", value: "2" },
  ];

  const handler = (event) => {
    const value = event.value;
    selectProduct(value);
    props.handleClick();
    props.stateChanger(value);
  };

  const handleCheck = (event) => {
    props.setCradeltoGrave(!props.cradeltoGrave);
  };

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
        let tempOptions = [];
        data.sort().forEach((element) => {
          tempOptions.push({ value: element, label: element });
        });
        setOptions(tempOptions);
      });
    });
  }, []);

  return (
    <MenuDiv show={props.show}>
      <Selector>
        <Label>Select a Desired Scope</Label>
        <Select
          options={options}
          className="selector-custom"
          classNamePrefix="selector-options"
          onChange={handler}
          selected={options[0]}
          // value={scope}
        />
      </Selector>
      <hr />
      {/* <Row> */}
      {/* <Label>Cradel to Grave </Label> */}
      <Label>
        {" "}
        <Titles
          title="Cradel to Grave"
          modal_title="About Cradel to Grave"
          modal_description={
            "Cradle-to-grave \nCradle-to-grave refers to the carbon impact of a product at every stage of a product's life-cycle, from the time the natural resources are extracted from the ground and processed— through to manufacturing, transportation, product use, and ultimately, disposal. Cradle-to-grave assessments are important, wholistic views of the footprint of a product; in many cases, the majority of a product's footprint comes from the use & disposal stages.\nCradle-to-Gate\nCradle-to-Gate is a system boundary that only considers the impact of a product or service from the moment it’s produced to the moment it becomes available for purchase, such as on a store shelf. Impacts from the end distribution, use, or disposal of the product are not included. This means that the carbon stored in the organic components of the product (biogenic carbon), normally released at the product end-of-life stage, is not factored into the footprint. Cradle-to-gate assessments are primarily performed today to comply with carbon labeling standards from the GHG Protocol."
          }
          setShow={setShow}
          show={show}
        />
      </Label>
      {/* </Row> */}
      <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? "outline-light" : "outline-dark"}
            name="radio"
            value={radio.value}
            checked={props.cradeltoGrave === radio.value}
            onChange={(e) => props.setCradeltoGrave(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <hr />
      <br />
      <nav onClick={props.handleClick}>
        {/* <Row> */}
        <NavLink exact to="/">
          <span>Home</span>
        </NavLink>
        {/* </Row> */}
        {/* <Row> */}
        <NavLink to="other">
          <span>Other</span>
        </NavLink>
        {/* </Row> */}
        {/* <Row> */}
        <NavLink to="label">
          <span>Carbon Label</span>
        </NavLink>
        {/* </Row> */}
      </nav>
      <button onClick={props.handleClick}></button>
    </MenuDiv>
  );
}
