import { useQueryParam, ArrayParam } from "use-query-params";
import filter from "lodash/fp/filter";
import flow from "lodash/fp/flow";
import GraphEdge from "./types/GraphEdge";
import GraphNode from "./types/GraphNode";
import GraphRenderer from "./graph-renderer";
import includes from "lodash/fp/includes";
import map from "lodash/fp/map";
import React from "react";
import sortBy from "lodash/fp/sortBy";
import styles from "./styles.module.css";
import toLower from "lodash/fp/toLower";

const header = [
  "strict digraph SoftwareArchitecture {",
  "overlap = false;",
  'node [fontsize=16 fontname="Proxima Nova"];',
  'rankdir="LR"',
  'outputorder="edgesfirst"'
];
type checkBox = {
  value: string;
  name: string;
};

const filterNodes = (checkedItems: string[] | undefined) =>
  filter((node: GraphNode) => includes(node.id, checkedItems));

const filterEdges = (checkedItems: string[] | undefined) =>
  filter(
    (edge: GraphEdge) =>
      includes(edge.from, checkedItems) && includes(edge.to, checkedItems)
  );

const StateManagement = ({
  edges,
  nodes
}: {
  edges: GraphEdge[];
  nodes: GraphNode[];
}) => {
  console.log({edges, nodes})
  const checkBoxes: checkBox[] = flow(
    map((node: GraphNode) => ({ value: node.id, name: node.name })),
    sortBy((node: checkBox) => toLower(node.name))
  )(nodes);
  const [checkedItems, setCheckedItems] = useQueryParam("a", ArrayParam);

  const handleChange = (event: {
    target: { checked: boolean; name: string };
  }) => {
    const clonedSet = new Set(checkedItems);
    clonedSet[event.target.checked ? "add" : "delete"](event.target.name);
    setCheckedItems(Array.from(clonedSet));
  };

  const handleSelectAll = () => setCheckedItems(map("value", checkBoxes));
  const handleClear = () => setCheckedItems([]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <button className={styles.button} onClick={handleSelectAll}>
          Select all
        </button>
        <button className={styles.button} onClick={handleClear}>
          Clear
        </button>
        {checkBoxes.map((item: checkBox) => (
          <div key={item.value}>
            <label>
              <input
                checked={includes(item.value)(checkedItems)}
                name={item.value}
                onChange={handleChange}
                type="checkbox"
              />
              {item.name.split("\n")[0]}
            </label>
          </div>
        ))}
      </div>
      <GraphRenderer
        {...{
          edges: filterEdges(checkedItems)(edges),
          header,
          nodes: filterNodes(checkedItems)(nodes)
        }}
      />
    </div>
  );
};

export default StateManagement;
