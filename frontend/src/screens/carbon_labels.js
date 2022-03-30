import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/header.css";
import Plot from "react-plotly.js";
import {
  BodyContainer,
  Column,
  Title,
  FAQTitle,
  FAQBox,
  CarbonSet,
} from "./styles/styles";
import { Modal, Button } from "react-bootstrap";
import { Row, PseudoCarbon } from "./styles/styles";
import Titles from "../components/titles";

export function CarbonLabel(props) {
  const [imgCoded, setImageCoded] = useState(undefined);

  useEffect(() => {
    let url = process.env.REACT_APP_SERVER + "/renderLabel/" + props.product;

    fetch(url, {
      mode: "cors",
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        // "Content-Type": "application/octet-stream",
      },
    }).then((response) => {
      response.json().then((data) => {
        setImageCoded(data);
        console.log(imgCoded);
      });
    });
  }, [props.product]);

  function getDateLabel() {
    const d = new Date(Date.now()).toLocaleString().split(",")[0];
    return d;
  }

  function createLabels(arrImg) {
    let val = Object.entries(arrImg).map((e) => {
      return (
        <CarbonSet>
          <Row>
            <PseudoCarbon>
              <img src={"data:image/png;base64," + e[1]} width="50%" />
            </PseudoCarbon>
          </Row>
          <Row>
            <a
              href={"data:image/png;base64," + e[1]}
              download={
                "Carbon Label for " +
                props.product +
                " by " +
                process.env.REACT_APP_CLIENT +
                " " +
                getDateLabel() +
                ".png"
              }
            >
              <Button>Download</Button>
            </a>
          </Row>
        </CarbonSet>
      );
    });

    return val;
  }
  console.log(imgCoded);
  return (
    <BodyContainer show={props.show} isFAQ={true}>
      {imgCoded ? createLabels(imgCoded) : <></>}
      <Column isFAQ={true}>
        <FAQTitle>
          <h1>FAQ.</h1>
        </FAQTitle>
        <FAQBox>
          <h4>How was this number calculated?</h4>
          <p>
            The carbon footprint of this product was calculated by performing a
            Life Cycle Assessment (LCA). A LCA is a framework that is used to
            measure the impact of a product over its lifespan.
            <br />
            This LCA measured the CO2e generated from the lifecycle of one pair
            of Fulton insoles.
          </p>
        </FAQBox>
        <FAQBox>
          <h4>What is CO2e?</h4>
          <p>
            CO2e, or "CO2 equivalents" is a metric that accounts for all
            Greenhouse Gases (GhGs), not just CO2, as a more holistic way of
            measuring harmful emissions. Many of these gasses exist in lower
            quantities but are much more potent than CO2. CO2e is calculated by
            equivalating the other GhGs with the warming potential of CO2 over a
            100-year period. In short, CO2e accounts for the impact all GhGs
            including CO2 when describing the impact of emissions on climate
            change.
          </p>
        </FAQBox>
        <FAQBox>
          <h4>How much is 1 kg of CO2e?</h4>1 kg of CO2e is equivalent to:
          <ul>
            <li>2.5 miles driven in the average passenger vehicle</li>
            <li> 122 smartphones charged</li>
            <li> 1.1 lbs of coal burned</li>
          </ul>
        </FAQBox>
        <FAQBox>
          <h4>What’s included in this value?</h4>
          <p>
            The carbon footprint listed for this product is the **Cradle-to-Gate
            footprint**, meaning it accounts for the impact of the product from
            the raw material stage to merchandising for retail or preparation
            for Direct-to-Consumer shipments. This includes the production,
            transportation, and all packaging for the product.
            <br />
            Using the Cradle-to-Gate data for carbon labels is important to
            provide a consistent benchmark for the impacts of products, so they
            can be accurately compared by consumers.
          </p>
        </FAQBox>
        <FAQBox>
          <h4>What isn’t included in this value?</h4>
          <p>
            The value on the carbon label does not include impacts from the
            distribution, use, or disposal of the product. This means that the
            emission of carbon stored in the organic components of the product
            (biogenic carbon) at end-of-life is not factored into the value in
            the carbon label.
            <br />
            An assessment that includes all lifecycle stages, from raw material
            to disposal, is called a “Cradle-to-Grave” assessment. A complete
            Cradle-to-Grave assessment has been performed for holistic insights
            into the insole’s footprint, however, it is not best practice to use
            this value for carbon labeling.
          </p>
        </FAQBox>
      </Column>
      {/* Add in FAQ Section */}
    </BodyContainer>
  );
}
