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
import Select from "react-select";
import Plot from "react-plotly.js";
import getData from "../library";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import { render } from "react-dom";
import context from "react-bootstrap/esm/AccordionContext";
import { Menu } from "./menu";
import Titles from "../components/titles";

export function Emissions(props) {
  const [scope, selectScope] = useState("0");
  const [options, setOptions] = useState([]);
  const [fullData, setFullData] = useState(undefined);
  const [treeMapData, setTreeMapData] = useState(undefined);
  // const [sankeyData, setSankeyData] = useState(undefined);
  const [impactData, setImpactData] = useState(undefined);
  const [dataTable, setDataTable] = useState(undefined);
  const [show, setShow] = useState(false);
  const [summary, setSummary] = useState(undefined);

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
    console.log(temp2);
    let temp3 =
      process.env.REACT_APP_SERVER +
      "/toDict/" +
      props.product +
      "/" +
      props.cradeltoGrave;
    console.log(temp3);
    let temp4 =
      process.env.REACT_APP_SERVER +
      "/getStageRelation/" +
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
    // let temp7 =
    //   process.env.REACT_APP_SERVER +
    //   "/getSankeyFormat/" +
    //   props.product +
    //   "/" +
    //   props.cradeltoGrave;

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

    // fetch(temp7, {
    //   mode: "cors",
    //   method: "GET",
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "application/json",
    //   },
    // }).then((response) => {
    //   response.json().then((data) => {
    //     setSankeyData(data);
    //     console.log(data);
    //   });
    // });

    fetch(temp, {
      mode: "cors",
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        let tempOptions = [{ value: "all", label: "All" }];
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
        setDataTable(JsonDataDisplay(data));
      });
    });
  }, [scope, props.product, props.cradeltoGrave]);

  // https://www.geeksforgeeks.org/how-to-parse-json-data-into-react-table-component/
  function JsonDataDisplay(data) {
    const DisplayData = Object.values(data).map((info) => {
      return (
        <tr key={info["Step"] + info["Emissions (kg CO2e)"]}>
          <td>{info["Scope"]}</td>
          <td>{info["Product Stage"]}</td>
          <td>{info["Step"]}</td>
          <td>{info["Emissions (kg CO2e)"]}</td>
        </tr>
      );
    });
    return DisplayData;
  }

  function createBarChart(barChartData) {
    const tempData = [...new Set(Object.values(fullData["Product Stage"]))].map(
      (e) => {
        return {
          x: [...new Set(Object.values(fullData["Scope"]))],
          y: [...new Set(Object.values(fullData["Scope"]))].map((scope) => {
            return Object.entries(barChartData).filter(function (v, i) {
              return v[1].Scope == scope && v[1]["Product Stage"] == e;
            }).length;
          }),
          name: e,
          type: "bar",
        };
      }
    );
    return tempData;
  }

  function createImpactBar(barChartData) {
    const tempData = [...new Set(Object.values(fullData["Product Stage"]))].map(
      (e) => {
        var hi = [...new Set(Object.values(fullData["Impact Category"]))].map(
          (category) => {
            return Object.entries(fullData["Impact Category"]).filter(function (
              v,
              i
            ) {
              return v == category && fullData[i]["Product Stage"] == e;
            });
          }
        );
        console.log(hi);

        return {
          x: [...new Set(Object.values(fullData["Impact Category"]))],
          y: hi,
          name: e,
          type: "bar",
        };
      }
    );
    console.log(tempData);
    return tempData;
  }

  // console.log(
  //   fullData
  //     ? [...new Set(Object.values(fullData["Impact Category"]))].map(
  //         (category) => {
  //           return Object.entries(fullDataDict).filter(function (v, i) {
  //             return (
  //               v[1]["Impact Category"] == category &&
  //               v[1]["Product Stage"] == "Raw Material"
  //             );
  //           });
  //         }
  //       )
  //     : "No!!!!!!!!!!!!"
  // );

  return (
    <BodyContainer show={props.show}>
      <Titles
        title="Emissions by Stage"
        modal_title="About Stage"
        modal_description="Lorem Ipsum"
        setShow={setShow}
        show={show}
      />
      <Row>
        <Column>
          <ValueBox>
            <h2>
              {summary ? summary.total_emissions + "  (kg CO2e)" : "Loading..."}
            </h2>
            <h4>Emissions for Product</h4>
          </ValueBox>
          <TableWrapper>
            {" "}
            <Table className="table table-striped">
              <thead>
                <tr>
                  <th>Scope</th>
                  <th>Product Stage</th>
                  <th>Step</th>
                  <th>Emissions (kg CO2e)</th>
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
              ? "Treemap of Stages by Item"
              : "Chart is loading...",
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            treemapcolorway: ["lightblue"],
            width: 860,
            height: 525,
          }}
        />
      </Row>

      <Titles
        title="Emissions by Scope"
        modal_title="About Scope"
        modal_description="Lorem Ipsum"
        setShow={setShow}
        show={show}
      />
      <Row>
        <Column>
          <ValueBox>
            <h2>
              {summary ? summary.scope_emissions + "  (kg CO2e)" : "Loading..."}
            </h2>
            <h4>Emissions by Scope</h4>
          </ValueBox>
          <Selector>
            <Label>Select a Desired Scope</Label>
            <Select options={options} onChange={handler} />
          </Selector>
        </Column>

        <Plot
          className="bar-chart"
          data={
            fullDataDict
              ? createBarChart(fullDataDict)
              : [{ x: [0], y: [0], type: "bar" }]
          }
          layout={{
            title: fullData
              ? "Histogram of Scope by Product Stage"
              : "Chart is loading...",
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            barmode: "stack",
            showlegend: true,
          }}
        />
      </Row>

      <Titles
        title="Emissions by Impact Category"
        modal_title="About Impact"
        modal_description="Lorem Ipsum as Modal"
        setShow={setShow}
        show={show}
      />
      <Row>
        <Plot
          className="treemap"
          data={
            fullDataDict
              ? createImpactBar(fullDataDict)
              : [{ x: [0], y: [0], type: "bar" }]
          }
          layout={{
            title: impactData
              ? "Bar Chart of Impact and Stages"
              : "Chart is loading...",
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            width: 1460,
            height: 800,
          }}
        />
      </Row>
    </BodyContainer>
  );
}
