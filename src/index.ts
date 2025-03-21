import { draw } from "./draw.js";
import { Field } from "./types.js";

const field: Field = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Array(1).fill(0)));

field[2][2] = [1];

field[4][8] = [7];

draw(field);
