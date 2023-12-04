const fs = require("fs");
const util = require("util");
util.inspect.defaultOptions.maxArrayLength = null;

const log = console.info.bind(console);
const input = fs.readFileSync(`${__dirname}/../input.txt`, "utf8");
const games = input.trim().split("\n");

const sum = (nums) => nums.reduce((acc, cur) => acc + cur, 0);

const s = games.map((game) => {
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

  const c = you.filter((val) => winning.includes(val)).length;
  const p = c ? 2 ** (c - 1) : 0;

  // log(no, winning, you, p);

  return p;
});

log(sum(s));
