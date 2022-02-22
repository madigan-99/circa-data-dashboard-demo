import React, { useEffect, useContext } from "react";
import {
  ValueBox,
  Selector,
  Row,
  Label,
  Table,
  TableWrapper,
  Title,
  BodyContainer,
  Column,
} from "./styles/styles.js";
import { useState } from "react";
import Titles from "./../components/titles";
import Select from "react-select";
import Plot from "react-plotly.js";
import getData from "../library";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import { render } from "react-dom";
import context from "react-bootstrap/esm/AccordionContext";
import { Menu } from "./menu";

export function Other(props) {
  const [scope, selectScope] = useState("all");
  const [options, setOptions] = useState([]);
  const [fullData, setFullData] = useState(undefined);
  const [treeMapData, setTreeMapData] = useState(undefined);
  const [treeMapDataPlastic, setTreeMapDataPlastic] = useState(undefined);
  const [impactData, setImpactData] = useState(undefined);
  const [dataTable, setDataTable] = useState(undefined);
  const [dataTablePlastic, setDataTablePlastic] = useState(undefined);
  const [show, setShow] = useState(false);
  const [summary, setSummary] = useState(undefined);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const { product } =
  // React.useContext(ProductContext) != undefined ? "Exists" : "Fail";
  const [fullDataDict, setFullDataDict] = useState(undefined);

  const handler = (event) => {
    const value = event.value;
    selectScope(value);
  };
  // console.log({ product });
  useEffect(() => {
    //  let temp = "http://127.0.0.1:5000/testpath";
    let temp =
      process.env.REACT_APP_SERVER +
      "/getScopes/" +
      props.product +
      "/" +
      props.cradeltoGrave;
    let temp2 =
      process.env.REACT_APP_SERVER +
      "/fullDataBar/" +
      props.product +
      "/" +
      props.cradeltoGrave;
    let temp3 =
      process.env.REACT_APP_SERVER +
      "/toDict/" +
      props.product +
      "/" +
      props.cradeltoGrave;
    let temp4 =
      process.env.REACT_APP_SERVER +
      "/getStageRelationWater/" +
      props.product +
      "/" +
      props.cradeltoGrave;
    let temp7 =
      process.env.REACT_APP_SERVER +
      "/getStageRelationPlastic/" +
      props.product +
      "/" +
      props.cradeltoGrave;
    let temp5 =
      process.env.REACT_APP_SERVER +
      "/summary_statistics/" +
      props.product +
      "/" +
      scope +
      "/" +
      props.cradeltoGrave;

    let temp6 =
      process.env.REACT_APP_SERVER +
      "/getImpactRelation/" +
      props.product +
      "/" +
      props.cradeltoGrave;

    fetch(temp2, {
      mode: "cors",
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        let parsed = JSON.parse(data);
        setFullData(parsed);
      });
    });
    fetch(temp4, {
      mode: "cors",
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        setTreeMapData(data);
        console.log(data);
      });
    });
    fetch(temp7, {
      mode: "cors",
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        setTreeMapDataPlastic(data);
        console.log(data);
      });
    });

    fetch(temp5, {
      mode: "cors",
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        setSummary(data);
        console.log(data);
      });
    });

    fetch(temp6, {
      mode: "cors",
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        setImpactData(data);
      });
    });

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

    fetch(temp3, {
      mode: "cors",
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        setFullDataDict(data);
        console.log(data);
        setDataTable(JsonDataDisplay(data));
        setDataTable(JsonDataDisplayPlastic(data));
        // renderTree();
      });
    });
  }, [scope, props.product]);

  // https://www.geeksforgeeks.org/how-to-parse-json-data-into-react-table-component/
  function JsonDataDisplay(data) {
    const DisplayData = Object.values(data).map((info) => {
      if (info["Water (m3)"] > 0) {
        return (
          <tr key={info["Step"] + info["Emissions (kg CO2e)"]}>
            <td>{info["Scope"]}</td>
            <td>{info["Product Stage"]}</td>
            <td>{info["Step"]}</td>
            <td>{info["Water (m3)"]}</td>
          </tr>
        );
      }
    });
    return DisplayData;
  }

  function JsonDataDisplayPlastic(data) {
    const DisplayData = Object.values(data).map((info) => {
      return (
        <tr key={info["Step"] + info["Emissions (kg CO2e)"]}>
          <td>{info["Scope"]}</td>
          <td>{info["Product Stage"]}</td>
          <td>{info["Step"]}</td>
          <td>{info["Plastic (kg)"]}</td>
        </tr>
      );
    });
    return DisplayData;
  }

  return (
    <BodyContainer show={props.show}>
      <Titles
        title="Water by Stage"
        modal_title="About Stage"
        modal_description="Lorem Ipsum"
        setShow={setShow}
        show={show}
      />
      <Row>
        <Column>
          <ValueBox>
            <h2>{summary ? summary.total_water : "Loading..."} (m3)</h2>
            <h4>Total</h4>
          </ValueBox>
          <TableWrapper>
            {" "}
            <Table className="table table-striped">
              <thead>
                <tr>
                  <th>Scope</th>
                  <th>Product Stage</th>
                  <th>Step</th>
                  <th>Water (m3)</th>
                </tr>
              </thead>
              <tbody>{dataTable}</tbody>
            </Table>
          </TableWrapper>
        </Column>
        <Plot
          className="treemap"
          data={[
            {
              type: "treemap",
              labels: treeMapData ? treeMapData.labels : [0],
              parents: treeMapData ? treeMapData.parents : [0],
              values: treeMapData ? treeMapData.values : [0],
              branchvalues: "total",
            },
          ]}
          layout={{
            title: treeMapData
              ? "Treemap of Stages by Step"
              : "Chart is loading...",
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            width: 860,
            height: 525,
          }}
        />
      </Row>
      <Titles
        title="Plastic Usage"
        modal_title="About Stage"
        modal_description="Lorem Ipsum"
        setShow={setShow}
        show={show}
      />
      <Row>
        <Column>
          <ValueBox>
            <h2>{summary ? summary.total_plastic : "Loading..."} (m3)</h2>
            <h4>Total</h4>
          </ValueBox>
          <TableWrapper>
            {" "}
            <Table className="table table-striped">
              <thead>
                <tr>
                  <th>Scope</th>
                  <th>Product Stage</th>
                  <th>Step</th>
                  <th>Plastic (kg)</th>
                </tr>
              </thead>
              <tbody>{dataTable}</tbody>
            </Table>
          </TableWrapper>
        </Column>
        <Plot
          className="treemap"
          data={[
            {
              type: "treemap",
              labels: treeMapDataPlastic ? treeMapDataPlastic.labels : [0],
              parents: treeMapDataPlastic ? treeMapDataPlastic.parents : [0],
              values: treeMapDataPlastic ? treeMapDataPlastic.values : [0],
              branchvalues: "total",
            },
          ]}
          layout={{
            title: treeMapDataPlastic
              ? "Treemap of Stages by Step"
              : "Chart is loading...",
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            width: 860,
            height: 525,
          }}
        />
      </Row>
    </BodyContainer>
  );
}
