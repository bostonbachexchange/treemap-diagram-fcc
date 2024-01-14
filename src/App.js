import * as d3 from "d3";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [treedata, setTreeData] = useState();

  const treeURL =
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
  const colors = ["rgb(76, 146, 195)", "rgb(190, 210, 237)", "rgb(255, 153, 62)", "rgb(255, 201, 147)", "rgb(86, 179, 86)", "rgb(173, 229, 161)", "rgb(222, 82, 83)", "rgb(255, 173, 171)", "rgb(169, 133, 202)", "rgb(209, 192, 221)", "rgb(163, 120, 111)", "rgb(208, 176, 169)", "rgb(233, 146, 206)", "rgb(249, 197, 219)", "rgb(153, 153, 153)", "rgb(210, 210, 210)", "rgb(201, 202, 78)", "rgb(226, 226, 164)", "rgb(69, 203, 217)"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await d3.json(treeURL);
        setTreeData(jsonData);
      } catch (error) {
        console.error("Error loading JSON data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    treedata && drawTree();
  }, [treedata]);

  function drawTree() {
    console.log("treeData", treedata);

    const container = d3.select("#container");

    let hierarchy = d3
      .hierarchy(treedata, (node) => {
        return node["children"];
      })
      .sum((node) => {
        return node["value"];
      })
      .sort((node1, node2) => {
        return node2["value"] - node1["value"];
      });

    const createTreeMap = d3.treemap().size([1000, 600]);

    createTreeMap(hierarchy);

    const tilesArray = hierarchy.leaves();

    let tileGroup = container
      .selectAll("g")
      .data(tilesArray)
      .enter()
      .append("g")
      .attr("transform", (kickstarter)=> {
        return `translate(${kickstarter.x0}, ${kickstarter.y0})`
      });
    tileGroup
      .append("rect")
      .attr("class", "tile")
      .attr("fill", (kickstarter) => {
        let category = kickstarter.data.category;
        if (category === "Product Design") {
          return colors[0];
        } else if (category === "Tabletop Games") {
          return colors[1];
        } else if (category === "Video Games") {
          return colors[2];
        } else if (category === "Technology") {
          return colors[3];
        } else if (category === "Hardware") {
          return colors[4];
        } else if (category === "Sound") {
          return colors[5];
        } else if (category === "Gaming Hardware") {
          return colors[6];
        } else if (category === "Narrative Film") {
          return colors[7];
        } else if (category === "3D Printing") {
          return colors[8];
        } else if (category === "Television") {
          return colors[9];
        } else if (category === "Web") {
          return colors[10];
        } else if (category === "Wearables") {
          return colors[11];
        } else if (category === "Food") {
          return colors[12];
        } else if (category === "Games") {
          return colors[13];
        } else if (category === "Sculpture") {
          return colors[14];
        } else if (category === "Apparel") {
          return colors[15];
        } else if (category === "Art") {
          return colors[16];
        } else if (category === "Gadgets") {
          return colors[17];
        } else {
          return colors[18];
        }
      })
      .attr("data-name", (kickstarter)=> kickstarter.data["name"])
      .attr("data-category", (kickstarter)=> kickstarter.data["category"])
      .attr("data-value", (kickstarter)=> kickstarter.data["value"])
      .attr('width', (kickstarter)=> kickstarter.x1 - kickstarter.x0)
      .attr('height', (kickstarter)=> kickstarter.y1 - kickstarter.y0)
      .attr('stroke-width', 1)
      .attr('stroke', "white")

    console.log(tilesArray);

    // tileGroup
    //   .append('text')
    //   .text((kickstarter) => kickstarter.data["name"])
    //   .style('color', "blue")
    //   .attr('x', 4)
    //   .attr('y', 20);

      tileGroup.append("text")
    .attr('class', 'tile-text')
    .selectAll("tspan")
    .data(function(d) { return d.data.name.split(/(?=[A-Z][^A-Z])/g); })
    .enter().append("tspan")
    .attr("x", 5)
    .attr("y", function(d, i) { return 13 + i * 10; })
    .style("font-size", "10px")
    .text(function(d) { return d; });


  }
  return (
    <div className="App">
      <h1 id="title">Kickstarter Pledges</h1>
      <p id="description">
        Top 100 Most Pledged Kickstarter Campaigns Grouped By Category
      </p>
      <svg id="container" width={1000} height={600}></svg>
      {/* <div id="legend"></div> */}
      <svg id="legend" width="500">
        <g transform="translate(60,10)">
          <g transform="translate(0,0)">
            <rect
              width="15"
              height="15"
              class="legend-item"
              fill="rgb(76, 146, 195)"
            ></rect>
            <text x="18" y="13">
              Product Design
            </text>
          </g>
          <g transform="translate(150,0)">
            <rect
              width="15"
              height="15"
              class="legend-item"
              fill="rgb(190, 210, 237)"
            ></rect>
            <text x="18" y="13">
              Tabletop Games
            </text>
          </g>
          <g transform="translate(300,0)">
            <rect
              width="15"
              height="15"
              class="legend-item"
              fill="rgb(255, 153, 62)"
            ></rect>
            <text x="18" y="13">
              Video Games
            </text>
          </g>
          <g transform="translate(0,25)">
            <rect
              width="15"
              height="15"
              class="legend-item"
              fill="rgb(255, 201, 147)"
            ></rect>
            <text x="18" y="13">
              Technology
            </text>
          </g>
          <g transform="translate(150,25)">
            <rect
              width="15"
              height="15"
              class="legend-item"
              fill="rgb(86, 179, 86)"
            ></rect>
            <text x="18" y="13">
              Hardware
            </text>
          </g>
          <g transform="translate(300,25)">
            <rect
              width="15"
              height="15"
              class="legend-item"
              fill="rgb(173, 229, 161)"
            ></rect>
            <text x="18" y="13">
              Sound
            </text>
          </g>
          <g transform="translate(0,50)">
            <rect
              width="15"
              height="15"
              class="legend-item"
              fill="rgb(222, 82, 83)"
            ></rect>
            <text x="18" y="13">
              Gaming Hardware
            </text>
          </g>
          <g transform="translate(150,50)">
            <rect
              width="15"
              height="15"
              class="legend-item"
              fill="rgb(255, 173, 171)"
            ></rect>
            <text x="18" y="13">
              Narrative Film
            </text>
          </g>
          <g transform="translate(300,50)">
            <rect
              width="15"
              height="15"
              class="legend-item"
              fill="rgb(169, 133, 202)"
            ></rect>
            <text x="18" y="13">
              3D Printing
            </text>
          </g>
          <g transform="translate(0,75)">
            <rect
              width="15"
              height="15"
              class="legend-item"
              fill="rgb(209, 192, 221)"
            ></rect>
            <text x="18" y="13">
              Television
            </text>
          </g>
          <g transform="translate(150,75)">
            <rect
              width="15"
              height="15"
              class="legend-item"
              fill="rgb(163, 120, 111)"
            ></rect>
            <text x="18" y="13">
              Web
            </text>
          </g>
          <g transform="translate(300,75)">
            <rect
              width="15"
              height="15"
              class="legend-item"
              fill="rgb(208, 176, 169)"
            ></rect>
            <text x="18" y="13">
              Wearables
            </text>
          </g>
          <g transform="translate(0,100)">
            <rect
              width="15"
              height="15"
              class="legend-item"
              fill="rgb(233, 146, 206)"
            ></rect>
            <text x="18" y="13">
              Food
            </text>
          </g>
          <g transform="translate(150,100)">
            <rect
              width="15"
              height="15"
              class="legend-item"
              fill="rgb(249, 197, 219)"
            ></rect>
            <text x="18" y="13">
              Games
            </text>
          </g>
          <g transform="translate(300,100)">
            <rect
              width="15"
              height="15"
              class="legend-item"
              fill="rgb(153, 153, 153)"
            ></rect>
            <text x="18" y="13">
              Sculpture
            </text>
          </g>
          <g transform="translate(0,125)">
            <rect
              width="15"
              height="15"
              class="legend-item"
              fill="rgb(210, 210, 210)"
            ></rect>
            <text x="18" y="13">
              Apparel
            </text>
          </g>
          <g transform="translate(150,125)">
            <rect
              width="15"
              height="15"
              class="legend-item"
              fill="rgb(201, 202, 78)"
            ></rect>
            <text x="18" y="13">
              Art
            </text>
          </g>
          <g transform="translate(300,125)">
            <rect
              width="15"
              height="15"
              class="legend-item"
              fill="rgb(226, 226, 164)"
            ></rect>
            <text x="18" y="13">
              Gadgets
            </text>
          </g>
          <g transform="translate(0,150)">
            <rect
              width="15"
              height="15"
              class="legend-item"
              fill="rgb(69, 203, 217)"
            ></rect>
            <text x="18" y="13">
              Drinks
            </text>
          </g>
        </g>
      </svg>
    
      <div id="tooltip"></div>
    </div>
  );
}

export default App;
