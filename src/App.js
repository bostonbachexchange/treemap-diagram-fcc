import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import './App.css';


function App() {

  const [treedata, setTreeData] = useState()

  const treeURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
  const colors = []


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await d3.json(treeURL);
        setTreeData(jsonData)
      } catch (error) {
        console.error('Error loading JSON data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(()=> {
    treedata && drawTree()
  }, [treedata])

  function drawTree() {
    console.log("treeData", treedata)

    const container = d3.select("#container")
      // .attr("height", 1000)
      // .attr("width", 1000)
      // .style('background-color', 'grey')

    let hierarchy = d3.hierarchy(treedata, (node)=> {
      return node["children"]
    }).sum((node)=> {
      return node["value"]
    }).sort((node1, node2)=> {
      return node2["value"] - node1["value"]
    })
    
    const createTreeMap = d3.treemap()
        .size([1000, 600])

    createTreeMap(hierarchy)

    const tilesArray = hierarchy.leaves()

    let tileGroup = container.selectAll("g")
      .data(tilesArray)
      .enter()
      .append('g')
    
      tileGroup.append('rect')
      .attr("class", 'title')
      .attr("fill", (kickstarter)=> {
        let category = kickstarter.data.category
        if(category === "Product Design"){
          return ""
        } else if(category === "Tabletop Games"){
          return ""
        } else if(category === "Video Games"){
          return ""
        } else if(category === "Technology"){
          return ""
        } else if(category === "Hardware"){
          return ""
        } else if(category === "Sound"){
          return ""
        } else if(category === "Gaming Hardware"){
          return ""
        } else if(category === "Narrative Film"){
          return ""
        } else if(category === "3D Printing"){
          return ""
        } else if(category === "Television"){
          return ""
        } else if(category === "Web"){
          return ""
        } else if(category === "Wearables"){
          return ""
        } else if(category === "Food"){
          return ""
        } else if(category === "Games"){
          return ""
        } else if(category === "Sculpture"){
          return ""
        } else if(category === "Apparel"){
          return ""
        } else if(category === "Art"){
          return ""
        } else if(category === "Gadgets"){
          return ""
        } else{
          return
        }
  
      })

    console.log(tilesArray)

  }
  return (
    <div className="App">
      <h1 id="title">Kickstarter Pledges</h1>
      <p id='description'>Top 100 Most Pledged Kickstarter Campaigns Grouped By Category</p>
      <svg id="container"></svg>
      {/* <div id="legend"></div> */}
      <svg id="legend" width="500">
        <g transform="translate(60,10)">
          <g transform="translate(0,0)">
            <rect width="15" height="15" class="legend-item" fill="rgb(76, 146, 195)">
            </rect>
          <text x="18" y="13">Product Design</text>
          </g>
          <g transform="translate(150,0)">
            <rect width="15" height="15" class="legend-item" fill="rgb(190, 210, 237)"></rect>
            <text x="18" y="13">Tabletop Games</text>
          </g>
          <g transform="translate(300,0)">
            <rect width="15" height="15" class="legend-item" fill="rgb(255, 153, 62)">
            </rect>
            <text x="18" y="13">Video Games</text>
            </g><g transform="translate(0,25)"><rect width="15" height="15" class="legend-item" fill="rgb(255, 201, 147)"></rect><text x="18" y="13">Technology</text></g><g transform="translate(150,25)"><rect width="15" height="15" class="legend-item" fill="rgb(86, 179, 86)"></rect><text x="18" y="13">Hardware</text></g><g transform="translate(300,25)"><rect width="15" height="15" class="legend-item" fill="rgb(173, 229, 161)"></rect><text x="18" y="13">Sound</text></g><g transform="translate(0,50)"><rect width="15" height="15" class="legend-item" fill="rgb(222, 82, 83)"></rect><text x="18" y="13">Gaming Hardware</text></g><g transform="translate(150,50)"><rect width="15" height="15" class="legend-item" fill="rgb(255, 173, 171)"></rect><text x="18" y="13">Narrative Film</text></g><g transform="translate(300,50)"><rect width="15" height="15" class="legend-item" fill="rgb(169, 133, 202)"></rect><text x="18" y="13">3D Printing</text></g><g transform="translate(0,75)"><rect width="15" height="15" class="legend-item" fill="rgb(209, 192, 221)"></rect><text x="18" y="13">Television</text></g><g transform="translate(150,75)"><rect width="15" height="15" class="legend-item" fill="rgb(163, 120, 111)"></rect><text x="18" y="13">Web</text></g><g transform="translate(300,75)"><rect width="15" height="15" class="legend-item" fill="rgb(208, 176, 169)"></rect><text x="18" y="13">Wearables</text></g><g transform="translate(0,100)"><rect width="15" height="15" class="legend-item" fill="rgb(233, 146, 206)"></rect><text x="18" y="13">Food</text></g><g transform="translate(150,100)"><rect width="15" height="15" class="legend-item" fill="rgb(249, 197, 219)"></rect><text x="18" y="13">Games</text></g><g transform="translate(300,100)"><rect width="15" height="15" class="legend-item" fill="rgb(153, 153, 153)"></rect><text x="18" y="13">Sculpture</text></g><g transform="translate(0,125)"><rect width="15" height="15" class="legend-item" fill="rgb(210, 210, 210)"></rect><text x="18" y="13">Apparel</text></g><g transform="translate(150,125)"><rect width="15" height="15" class="legend-item" fill="rgb(201, 202, 78)"></rect><text x="18" y="13">Art</text></g><g transform="translate(300,125)"><rect width="15" height="15" class="legend-item" fill="rgb(226, 226, 164)"></rect><text x="18" y="13">Gadgets</text></g><g transform="translate(0,150)"><rect width="15" height="15" class="legend-item" fill="rgb(69, 203, 217)"></rect><text x="18" y="13">Drinks</text></g></g>
        </svg>
      <div id="tooltip"></div>
    </div>
  );
}

export default App;
