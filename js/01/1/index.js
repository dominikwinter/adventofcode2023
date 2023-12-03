const fs = require("fs");

const input = fs.readFileSync(`${__dirname}/../input.txt`, "utf8");

const numbers = input
  .trim()
  .split("\n")
  .map((line) => {
    const firstNumber = line.match(/^[a-zA-Z]*([0-9])/)?.[1];
    const lastNumber = line.match(/([0-9])[a-zA-Z]*$/)?.[1];

    const number = `${firstNumber}${lastNumber}`;

    return parseInt(number);
  });

// console.info(numbers);

const sum = numbers.reduce((acc, number) => acc + number, 0);

console.info(sum);
