const fs = require("fs");

const input = fs.readFileSync(`${__dirname}/../input.txt`, "utf8");

const numbers = input
  .trim()
  .split("\n")
  .map((line) => {
    const [, val] = line.split(":");

    const parts = val
      .split(/,|;/)
      .map((part) => part.trim())
      .map((part) => {
        const [num, color] = part.split(" ");

        return [color, parseInt(num)];
      })
      .reduce((acc, part) => {
        const [color, num] = part;

        return {
          ...acc,
          [color]: Math.max(acc?.[color] ?? 0, num),
        };
      }, {});

    // console.info(no, parts);

    let power = 1;

    for (const color in parts) {
      power *= parts[color];
    }

    return power;
  })
  .filter(Boolean);

// console.info(numbers);

const sum = numbers.reduce((acc, number) => acc + number, 0);

console.info(sum);
