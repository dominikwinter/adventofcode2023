const fs = require("fs");
const util = require("util");
util.inspect.defaultOptions.maxArrayLength = null;

const log = console.info.bind(console);
const input = fs.readFileSync(`${__dirname}/../input.txt`, "utf8");
const grid = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const width = grid[0].length;
const height = grid.length;

const isNumber = (char) => char && /^\d+$/.test(char);
const isSymbol = (char) => char && char !== "." && !/^\d+$/.test(char);
const sum = (nums) => nums.reduce((acc, cur) => acc + cur, 0);
const mult = (nums) => nums.reduce((acc, cur) => acc * cur, 0);

// prettier-ignore
const neighbors = (x, y, endless = false) => {
  let xm1 = x - 1;
  let xp1 = x + 1;
  let ym1 = y - 1;
  let yp1 = y + 1;

  if (endless) {
    xm1 = xm1 < 0 ? width - 1 : x - 1;
    xp1 = xp1 >= width ? 0 : x + 1;
    ym1 = ym1 < 0 ? height - 1 : y - 1;
    yp1 = yp1 >= height ? 0 : y + 1;
  }

  return [
    [xm1, ym1], [x, ym1], [xp1, ym1],
    [xm1, y  ],           [xp1, y  ],
    [xm1, yp1], [x, yp1], [xp1, yp1],
  ]
}

const founds = [];

for (let y = 0; y < grid.length; ++y) {
  let number = "";
  let hasSymbol = false;

  for (let x = 0; x < grid[y].length; ++x) {
    const char = grid[y][x];

    if (isNumber(char)) {
      number += `${char}`;

      if (neighbors(x, y, true).some(([x, y]) => isSymbol(grid[y]?.[x]))) {
        hasSymbol = true;
      }
    } else {
      if (number.length && hasSymbol) {
        founds.push(parseInt(number));
      }

      number = "";
      hasSymbol = false;
    }
  }

  if (number.length && hasSymbol) {
    founds.push(parseInt(number));
  }
}

log(founds);
log(sum(founds));
