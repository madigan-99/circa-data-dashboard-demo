import React, { useEffect, useContext } from "react";
import {
  ValueBox,
  Row,
  Table,
  TableWrapper,
  BodyContainer,
  Column,
} from "./styles/styles.js";
import { useState } from "react";
import Titles from "./../components/titles";

import Plot from "react-plotly.js";

export function Other(props) {
  const [scope, selectScope] = useState("all");
  const [options, setOptions] = useState([]);
  const [fullData, setFullData] = useState(undefined);
  const [treeMapData, setTreeMapData] = useState(undefined);
  const [treeMapDataPlastic, setTreeMapDataPlastic] = useState(undefined);
  const [impactData, setImpactData] = useState(undefined);
  const [dataTableWater, setDataTableWater] = useState(undefined);
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
  useEffect(() => {
    //  let temp = "http://127.0.0.1:5000/testpath";
    let scopes_url =
      process.env.REACT_APP_SERVER +
      "/getScopes/" +
      props.product +
      "/" +
      props.cradeltoGrave;
    let fulldata_url =
      process.env.REACT_APP_SERVER +
      "/fullDataBar/" +
      props.product +
      "/" +
      props.cradeltoGrave;
    let dictionary_url =
      process.env.REACT_APP_SERVER +
      "/toDict/" +
      props.product +
      "/" +
      props.cradeltoGrave;
    let treemap_water_url =
      process.env.REACT_APP_SERVER +
      "/getStageRelationWater/" +
      props.product +
      "/" +
      props.cradeltoGrave;
    let treemap_plastic_url =
      process.env.REACT_APP_SERVER +
      "/getStageRelationPlastic/" +
      props.product +
      "/" +
      props.cradeltoGrave;
    let summary_url =
      process.env.REACT_APP_SERVER +
      "/summary_statistics/" +
      props.product +
      "/" +
      scope +
      "/" +
      props.cradeltoGrave;

    fetch(fulldata_url, {
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
    fetch(treemap_water_url, {
      mode: "cors",
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        setTreeMapData(data);
      });
    });
    fetch(treemap_plastic_url, {
      mode: "cors",
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        setTreeMapDataPlastic(data);
      });
    });

    fetch(summary_url, {
      mode: "cors",
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        setSummary(data);
      });
    });

    fetch(scopes_url, {
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

    fetch(dictionary_url, {
      mode: "cors",
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        setFullDataDict(data);
        setDataTableWater(JsonDataDisplayWater(data));
        setDataTablePlastic(JsonDataDisplayPlastic(data));
        // renderTree();
      });
    });
  }, [scope, props.product, props.cradeltoGrave]);

  // https://www.geeksforgeeks.org/how-to-parse-json-data-into-react-table-component/
  function JsonDataDisplayWater(data) {
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
      if (info["Plastic (kg)"] > 0) {
        return (
          <tr key={info["Step"] + info["Emissions (kg CO2e)"]}>
            <td>{info["Scope"]}</td>
            <td>{info["Product Stage"]}</td>
            <td>{info["Step"]}</td>
            <td>{info["Plastic (kg)"]}</td>
          </tr>
        );
      }
    });
    return DisplayData;
  }

  return (
    <BodyContainer show={props.show}>
      <Titles
        title="Water by Stage"
        modal_title="About Stage"
        modal_description="A Life Cycle Assessment (LCA) evaluates the footprint of a product across a chronological progression of it's life cycle. Stages refer to different types of activities throughout a product life cycle; these include Raw Materials, Manufacturing, Packaging, Distribution, and Disposal.
        "
        setShow={setShow}
        show={show}
      />
      <Row>
        <Column>
          <ValueBox>
            <h4>Water Usage for Product</h4>
            <h2>{summary ? summary.total_water : "Loading..."}</h2>
            <h5>(m3)</h5>
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
              <tbody>{dataTableWater}</tbody>
            </Table>
          </TableWrapper>
        </Column>
        <Column>
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
        </Column>
      </Row>
      <Titles
        title="Plastic Usage"
        modal_title="About Stage"
        modal_description="A Life Cycle Assessment (LCA) evaluates the footprint of a product across a chronological progression of it's life cycle. Stages refer to different types of activities throughout a product life cycle; these include Raw Materials, Manufacturing, Packaging, Distribution, and Disposal.
        "
        setShow={setShow}
        show={show}
      />
      <Row>
        <Column>
          <ValueBox>
            <h4>Plastic Usage for Product</h4>
            <h2>{summary ? summary.total_plastic : "Loading..."} </h2>
            <h5>(kg)</h5>
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
              <tbody>{dataTablePlastic}</tbody>
            </Table>
          </TableWrapper>
        </Column>
        <Column>
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
        </Column>
      </Row>
    </BodyContainer>
  );
}
