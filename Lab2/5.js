/** @format */

const fs = require("fs");

const complex1 = {
  real: 1,
  imaginary: 2,
};

const complex2 = {
  real: 3,
  imaginary: 4,
};

console.log("Complex Numbers:");
console.log(JSON.stringify(complex1));
console.log(JSON.stringify(complex2));

console.log("\nComplex Addition:");
const complexSum = {
  real: complex1.real + complex2.real,
  imaginary: complex1.imaginary + complex2.imaginary,
  magnitude: Math.sqrt(
    (complex1.real - complex2.real) ** 2 +
      (complex1.imaginary - complex2.imaginary) ** 2
  ),
};

fs.writeFile("./Lab2/complex.json", JSON.stringify(complexSum), (err) => {
  if (err) {
    console.error("Error writing the file:", err);
    return;
  }
  console.log("Complex sum written to file.");
});
