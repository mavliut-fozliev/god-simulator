import { Direction, Field } from "./types.js";
import { createStage, drawField } from "./drawField.js";
import { Entities } from "./consts.js";

const field: Field = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Array(1).fill(Entities.Surface)));

const { layer } = createStage("container", 500, 500);

function animate() {
  drawField(layer, field);
  requestAnimationFrame(animate);
}
animate();

//create items
field[2][2] = [Entities.Stone];

//agent
let agentPosition = { x: 4, y: 8 };

export let agentDirection = Direction.yMinus;

field[agentPosition.x][agentPosition.y] = [Entities.Agent];

function move() {
  const currentCell = field[agentPosition.x][agentPosition.y];
  const playerIdIndex = currentCell.indexOf(Entities.Agent);

  if (playerIdIndex !== -1) {
    currentCell.splice(playerIdIndex, 1);
  }

  let newX = agentPosition.x;
  let newY = agentPosition.y;

  switch (agentDirection) {
    case Direction.xPlus:
      newX++;
      break;
    case Direction.yPlus:
      newY++;
      break;
    case Direction.xMinus:
      newX--;
      break;
    case Direction.yMinus:
      newY--;
      break;
  }

  agentPosition = { x: newX, y: newY };
  field[newX][newY].push(Entities.Agent);
}

function turnAround(direction: "left" | "right") {
  const previous = agentDirection - 1 === -1 ? 3 : agentDirection - 1;
  const next = agentDirection + 1 === 4 ? 0 : agentDirection + 1;
  agentDirection = direction === "left" ? previous : next;
}

addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    move();
  }
  if (e.key === "ArrowLeft") {
    turnAround("left");
  }
  if (e.key === "ArrowRight") {
    turnAround("right");
  }
});
