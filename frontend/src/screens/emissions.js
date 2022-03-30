import React, { useEffect } from "react";
import {
  ValueBox,
  Selector,
  Row,
  Label,
  Table,
  TableWrapper,
  BodyContainer,
  Column,
} from "./styles/styles.js";
import { useState } from "react";
import Select from "react-select";
import Plot from "react-plotly.js";

import Titles from "../components/titles";

export function Emissions(props) {
  const [scope, selectScope] = useState("0");
  const [options, setOptions] = useState([]);
  const [fullData, setFullData] = useState(undefined);
  const [treeMapData, setTreeMapData] = useState(undefined);
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
    let scopes_url =
      process.env.REACT_APP_SERVER +
      "/getScopes/" +
      props.product +
      "/" +
      props.cradeltoGrave;
    let data_bar_url =
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

    let treemap_url =
      process.env.REACT_APP_SERVER +
      "/getStageRelation/" +
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
    let impact_bar_url =
      process.env.REACT_APP_SERVER +
      "/getImpactRelation/" +
      props.product +
      "/" +
      props.cradeltoGrave;

    fetch(data_bar_url, {
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
    fetch(treemap_url, {
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
        console.log(data);
      });
    });

    fetch(impact_bar_url, {
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

    fetch(scopes_url, {
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
          text: e,
          name: e,
          type: "bar",
          marker: {
            color: ["#07EFC3", "#09BA98"],
            line: {
              color: "rgba(0,0,0,1.0)",
              width: 2,
            },
          },
          font: {
            family: "Arial",
            size: 14,
            color: "rgba(245,246,249,1)",
          },
        };
      }
    );
    return tempData;
  }

  function createImpactBar(barChartData) {
    const tempData = [...new Set(Object.values(fullData["Product Stage"]))].map(
      (e) => {
        return {
          x: [...new Set(Object.values(fullData["Impact Category"]))],
          y: [...new Set(Object.values(fullData["Impact Category"]))]
            .map((ic) => {
              return Object.entries(barChartData).filter(function (v, i) {
                return (
                  v[1]["Impact Category"] == ic && v[1]["Product Stage"] == e
                );
              });
            })
            .map((x) => {
              var total_emissions = 0;
              x.forEach((item) => {
                total_emissions += item[1]["Emissions (kg CO2e)"];
              });
              return total_emissions;
            }),
          name: e,
          type: "bar",
          text: e,
          marker: {
            color: ["#07EFC3", "#09BA98"],
            line: {
              color: "rgba(0,0,0,1.0)",
              width: 2,
            },
          },
          font: {
            family: "Arial",
            size: 14,
            color: "rgba(245,246,249,1)",
          },
        };
      }
    );

    console.log(tempData);
    return tempData;
  }

  return (
    <BodyContainer show={props.show}>
      <Titles
        title="Emissions by Stage"
        modal_title="About Stage"
        modal_description="A Life Cycle Assessment (LCA) evaluates the footprint of a product across a chronological progression of it's life cycle. Stages refer to different types of activities throughout a product life cycle; these include Raw Materials, Manufacturing, Packaging, Distribution, and Disposal.
        "
        setShow={setShow}
        show={show}
      />
      <Row>
        <Column>
          <ValueBox>
            <h4>Emissions for Product</h4>
            <h2>{summary ? summary.total_emissions : "Loading..."}</h2>
            <h5>(kg CO2e)</h5>
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
                // marker: {
                // colors: ["#07EFC3", "#07EFC3", "#07EFC3", "#07EFC3", "#07EFC3"],
                // },
              },
            ]}
            layout={{
              title: treeMapData
                ? "Treemap of Stages by Item"
                : "Chart is loading...",
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              // marker: { colors: ["#07EFC3"] },
              // treemapcolorway: ["#07EFC3"],
              width: 860,
            }}
          />
        </Column>
      </Row>

      <Titles
        title="Emissions by Scope"
        modal_title="About Scope"
        modal_description={
          "The three GHG accounting scopes categorize emissions by source and ownership. \n Scope 1: Direct emissions from sources owned or controlled by the company, e.g. emissions from combustion in owned or controlled furnaces, vehicles, etc. \n Scope 2: Indirect electricity and heat GHG emissions from the company's use of electricity and heat; emissions occur physically at the facility where the electricity is generated. \n Scope 3: Other indirect GHG emissions occurring from sources not owned or controlled by the company, e.g. the extraction and production of purchased materials. "
        }
        setShow={setShow}
        show={show}
      />
      <Row>
        <Column>
          <ValueBox>
            <h4>Emissions by Scope</h4>
            <h2>{summary ? summary.scope_emissions : "Loading..."}</h2>
            <h4>(kg CO2e)</h4>
          </ValueBox>
          <Selector>
            <Label>Select a Desired Scope</Label>
            <Select options={options} onChange={handler} />
          </Selector>
        </Column>
        <Column>
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
              showlegend: false,
              xaxis: {
                autotick: false,
                tickcolor: "#000",
              },
            }}
          />
        </Column>
      </Row>

      <Titles
        title="Emissions by Impact Category"
        modal_title="About Impact"
        modal_description={
          "Impact Category corresponds each element of the product footprint with a primary environmental effects. Impact Categories currently encompass three key areas: \n - Combustion: GhGs emitted from combustion activities such as transportation or manufacturing. (GhG Protocol Scope I) \n - Cold storage: GhGs emitted through the use and operation of refrigerants (GhG Protocol Scope I) \n - Biodiversity Impact: GhGs emitted from materials or processes that utilize wood pulp/paper products (ReCiPe Midpoint category: land use/transformation)"
        }
        setShow={setShow}
        show={show}
      />
      <Row>
        <Column>
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
              width: 1200,
              height: 600,
              barmode: "stack",
              yaxis: {
                autotick: true,
                ticks: "outside",
                tick0: 0,

                tickcolor: "#000",
              },
              showlegend: false,
            }}
          />
        </Column>
      </Row>
    </BodyContainer>
  );
}
