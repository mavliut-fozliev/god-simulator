import Konva from "konva";
import { Field } from "./types.js";
import { Entities } from "./consts.js";
import { agentDirection } from "./index.js";

const cellSize = 50;

export function createStage(containerId: string, width: number, height: number) {
  const stage = new Konva.Stage({
    container: containerId,
    width,
    height,
  });

  const layer = new Konva.Layer();
  stage.add(layer);

  return { stage, layer };
}

function getColor(objectId: number): string {
  const colors: Record<number, string> = {
    [Entities.Surface]: "gray",
    [Entities.Stone]: "blue",
    [Entities.Agent]: "red",
  };
  return colors[objectId || 0];
}

export function drawField(layer: Konva.Layer, field: Field) {
  layer.destroyChildren();

  field.forEach((column, x) => {
    column.forEach((cell, y) => {
      const lastId = cell.at(-1);
      const color = getColor(lastId);
      let figure;

      if (lastId == Entities.Agent) {
        figure = new Konva.RegularPolygon({
          x: x * cellSize + cellSize / 2,
          y: y * cellSize + cellSize / 2,
          sides: 3,
          radius: cellSize / 2,
          fill: color,
          stroke: "black",
          strokeWidth: 1,
        });
        figure.rotation(90 * agentDirection);
      } else {
        figure = new Konva.Rect({
          x: x * cellSize,
          y: y * cellSize,
          width: cellSize,
          height: cellSize,
          fill: color,
          stroke: "black",
          strokeWidth: 1,
        });
      }

      layer.add(figure);
    });
  });

  layer.batchDraw();
}
