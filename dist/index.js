import { draw } from "./draw.js";
const field = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Array(1).fill(0)));
field[2][2] = [1];
field[4][8] = [7];
draw(field);
