import { Module, render } from "viz.js/full.render.js";
import React, { useState } from "react";
import Viz from "viz.js";
import GraphEdge from "../../../types/GraphEdge";
import GraphNode from "../../../types/GraphNode";
import map from "lodash/fp/map";
import nodeToDot from "./utils/node-to-dot";
import edgeToDot from "./utils/edge-to-dot";

const viz = new Viz({ Module, render });

const newLine = "\n";

const GraphRenderer = ({
  header,
  edges,
  nodes
}: {
  header: string[];
  edges: GraphEdge[];
  nodes: GraphNode[];
}) => {
  const [svgHtml, setSvgHtml] = useState("");

  const allItems: string[][] = [
    header,
    map(edgeToDot, edges),
    map(nodeToDot, nodes),
    ["}"]
  ];

  viz
    .renderString(
      allItems.map((subarray: string[]) => subarray.join(newLine)).join(newLine)
    )
    .then(setSvgHtml)
    .catch(console.error);

  if (!svgHtml) {
    return <div>Rendering</div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: svgHtml }} />;
};
export default GraphRenderer;
