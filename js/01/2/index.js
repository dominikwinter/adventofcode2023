const fs = require("fs");

const map = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const words = Object.keys(map);

const input = fs.readFileSync(`${__dirname}/../input.txt`, "utf8");

const numbers = input
  .trim()
  .split("\n")
  .map((line) => {
    const p1 = words
      .map((word) => ({ pos: line.indexOf(word), val: map[word] }))
      .filter((res) => res.pos !== -1)
      .sort((a, b) => a.pos - b.pos);

    const p2 = words
      .map((word) => ({ pos: line.lastIndexOf(word), val: map[word] }))
      .filter((res) => res.pos !== -1)
      .sort((a, b) => a.pos - b.pos);

    // console.info({ line, p1: p1.at(0)?.val ?? 0, p2: p2.at(-1)?.val ?? 0 });

    const n1 = p1.at(0)?.val;
    const n2 = p2.at(-1)?.val;

    if (n1 === undefined || n2 === undefined) {
      throw new Error("Invalid input");
    }

    return parseInt(`${n1}${n2}`);
  });

// console.info(numbers);

const sum = numbers.reduce((acc, number) => acc + number, 0);

console.info(sum);
