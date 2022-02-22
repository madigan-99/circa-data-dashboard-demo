// let temp2 = "http://127.0.0.1:5000/fullDataBar";
// function getData() {
//   fetch(temp2, {
//     mode: "cors",
//     method: "GET",
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Content-Type": "application/json",
//     },
//   }).then((response) => {
//     response.json().then((data) => {
//       // /setMap(new Map(Object.entries(data)));
//       let parsed = JSON.parse(data);
//       return parsed;
//       // console.log(JSON.parse(data));
//     });
//   });
// }

// labels_tree <- c("Total", total_data_percents$Step, unique(total_data_percents$Product.Stage))
// parents_tree <-  c("", total_data_percents$Product.Stage, rep("Total", length(unique(total_data_percents$Product.Stage))))
// // values_tree <- c(data()$total_emissions, total_data_percents$Emissions..kg.CO2e., unique(total_data_percents$emissions_stage))

// let labels = concat(["Total"], Object.values(fullDataDict.Step), [...new Set(Object.values(fullData.Stage))])
// let parent = concat([""], Object.values(fullDataDict.Stage), rep("Total", [...new Set(Object.values(fullData.Stage))].length))

// fig2 <- plot_ly(
//   labels = labels_tree,
//   parents = parents_tree,
//   values = values_tree,
//   type = 'treemap',
//   textinfo="label+value+percent parent+percent entry",
//   branchvalues="total",
//   hovertext=c("100%", total_data_percents$emissions_percent_stage, unique(total_data_percents$emissions_percent_stage)),
//   outsidetextfont=list(size=20, color= "darkblue"),
//   marker=list(line= list(width=1)),
//   pathbar=list(visible= FALSE),
// )
// fig2

// export default getData;
