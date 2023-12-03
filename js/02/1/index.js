const fs = require("fs");

const input = fs.readFileSync(`${__dirname}/../input.txt`, "utf8");

const limits = {
  red: 12,
  green: 13,
  blue: 14,
};

const numbers = input
  .trim()
  .split("\n")
  .map((line) => {
    const [key, val] = line.split(":");

    const no = parseInt(key.replace("Game ", ""));

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

          // In game 1, three sets of cubes are revealed from the bag (and then put back again)
          // [color]: (acc?.[color] ?? 0) + num,

          [color]: Math.max(acc?.[color] ?? 0, num),
        };
      }, {});

    // console.info(no, parts);

    for (const color in parts) {
      const num = parts[color];

      if (limits[color] && num > limits[color]) {
        return null;
      }
    }

    return no;
  })
  .filter(Boolean);

// console.info(numbers);

const sum = numbers.reduce((acc, number) => acc + number, 0);

console.info(sum);
