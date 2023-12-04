const fs = require("fs");
const util = require("util");
util.inspect.defaultOptions.maxArrayLength = null;

const log = console.info.bind(console);
const input = fs.readFileSync(`${__dirname}/../input.txt`, "utf8");
const games = input.trim().split("\n");

const sum = (nums) => nums.reduce((acc, cur) => acc + cur, 0);

const result = games.map((game) => {
  const [left, right] = game.split(":");
  const no = parseInt(left.replace("Card", "").trim());

  let [winning, you] = right.split(" | ");

  winning = winning
    .split(" ")
    .map((val) => parseInt(val.trim()))
    .filter(Boolean);

  you = you
    .split(" ")
    .map((val) => parseInt(val.trim()))
    .filter(Boolean);

  return {
    no,
    cnt: you.filter((val) => winning.includes(val)).length,
    count: 1,
  };
});

log(result);

// log("----------------");

for (let i = 0; i < result.length; ++i) {
  for (let j = 0; j < result[i].cnt; ++j) {
    result[i + j + 1].count += result[i].count;
  }
  // log(result);
}

// log("----------------");

log(result);

log(sum(result.map(({ count }) => count)));
