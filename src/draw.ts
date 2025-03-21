import Konva from "konva";
import { Field } from "./types";

export function draw(field: Field) {
  const stage = new Konva.Stage({
    container: "container",
    width: 500,
    height: 500,
  });

  const layer = new Konva.Layer();
  stage.add(layer);

  field.forEach((x, xi) => {
    x.forEach((y, yi) => {
      y.forEach((cell) => {
        const rect = new Konva.Rect({
          x: xi * 50,
          y: yi * 50,
          width: 50,
          height: 50,
          fill: cell === 0 ? "gray" : cell === 1 ? "green" : "red",
          stroke: "black",
          strokeWidth: 4,
        });
        layer.add(rect);
      });
    });
  });

  stage.add(layer);
}
