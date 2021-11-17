import GraphEdge from '../../../types/GraphEdge';
import rgbHex from 'rgb-hex';

const font = 'Helvetica Neue';

const getColorPart = (edge: GraphEdge) => Math.min((Math.log(edge.minutesBetweenData) / Math.log(1440)) * 255, 230);

const edgeToDot = (showDetail: boolean) => (edge: GraphEdge) => {
  const greyValue = getColorPart(edge);
  const hexColor = rgbHex(greyValue, greyValue, greyValue);

  const tooltip = `tooltip=${edge.description}`;

  const description = edge.description
    ? showDetail ? `label=<<font face="${font}">${edge.description}</font>> ${tooltip}` : tooltip
    : '';

  return `"${edge.from}" -> "${edge.to}" [color="#${hexColor}" ${description}]`;
};

export default edgeToDot;
