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
      nums[cnt].sym += ` ${hasSymbol(grid, x, y)} `;
    } else {
      ++cnt;
      nums[cnt] = {
        val: "",
        sym: "",
      };
    }
  }
}

const foo = {};

numbers = nums
  .map((num) => {
    num.sym = num.sym.trim();
    if (num.sym.length > 0) {
      const x = num.sym
        .split(" ")
        .map((s) => s.trim())
        .filter(Boolean)
        .filter(onlyUnique)
        .join("");
      num.sym = x;
      return num;
    } else {
      return null;
    }
  })
  .filter(Boolean);

numbers.forEach((num) => {
  if (!foo[num.sym]) foo[num.sym] = [];
  foo[num.sym].push(num.val);
});

// console.info(numbers);
// console.info(foo);

let sum = 0;
Object.keys(foo).forEach((key) => {
  if (foo[key].length > 1) {
    const x = foo[key]
      .map((val) => parseInt(val))
      .reduce((acc, val) => acc * val, 1);

    console.info(x, foo[key]);

    sum += x;
  }
});

console.info(sum);

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

function isNum(str) {
  return /^\d+$/.test(str);
}

function isSymbol(str) {
  return str === "*";
}

function hasSymbol(grid, x, y) {
  const asdf =
    (isSymbol(grid[y - 1]?.[x]) ? `${y - 1}|${x}` : "") +
    (isSymbol(grid[y + 1]?.[x]) ? `${y + 1}|${x}` : "") +
    (isSymbol(grid[y]?.[x - 1]) ? `${y}|${x - 1}` : "") +
    (isSymbol(grid[y]?.[x + 1]) ? `${y}|${x + 1}` : "") +
    (isSymbol(grid[y - 1]?.[x - 1]) ? `${y - 1}|${x - 1}` : "") +
    (isSymbol(grid[y + 1]?.[x - 1]) ? `${y + 1}|${x - 1}` : "") +
    (isSymbol(grid[y - 1]?.[x + 1]) ? `${y - 1}|${x + 1}` : "") +
    (isSymbol(grid[y + 1]?.[x + 1]) ? `${y + 1}|${x + 1}` : "");

  return isSymbol(grid[y - 1]?.[x]) ||
    isSymbol(grid[y + 1]?.[x]) ||
    isSymbol(grid[y]?.[x - 1]) ||
    isSymbol(grid[y]?.[x + 1]) ||
    isSymbol(grid[y - 1]?.[x - 1]) ||
    isSymbol(grid[y + 1]?.[x - 1]) ||
    isSymbol(grid[y - 1]?.[x + 1]) ||
    isSymbol(grid[y + 1]?.[x + 1])
    ? asdf
    : " ";
}
