const fs = require("fs");

const input = fs.readFileSync(`${__dirname}/../input.txt`, "utf8");
const grid = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));

let nums = [
  {
    val: "",
    sym: "",
  },
];
let cnt = 0;

for (let y = 0, l = grid.length; y < l; ++y) {
  for (let x = 0, m = grid[y].length; x < m; ++x) {
    const char = grid[y][x];

    if (isNum(char)) {
      nums[cnt].val += `${char}`;
      nums[cnt].sym += hasSymbol(grid, x, y);
    } else {
      ++cnt;
      nums[cnt] = {
        val: "",
        sym: "",
      };
    }
  }
}

numbers = nums
  .map((num) => {
    if (num.sym.includes("1")) {
      return parseInt(num.val);
    } else {
      return null;
    }
  })
  .filter(Boolean);

const sum = numbers.reduce((acc, number) => acc + number, 0);
console.info(sum);

function isNum(str) {
  return /^\d+$/.test(str);
}

function isSymbol(str) {
  return str && !isNum(str) && str !== ".";
}

function hasSymbol(grid, x, y) {
  return isSymbol(grid[y - 1]?.[x]) ||
    isSymbol(grid[y + 1]?.[x]) ||
    isSymbol(grid[y]?.[x - 1]) ||
    isSymbol(grid[y]?.[x + 1]) ||
    isSymbol(grid[y - 1]?.[x - 1]) ||
    isSymbol(grid[y + 1]?.[x - 1]) ||
    isSymbol(grid[y - 1]?.[x + 1]) ||
    isSymbol(grid[y + 1]?.[x + 1])
    ? "1"
    : " ";
}
