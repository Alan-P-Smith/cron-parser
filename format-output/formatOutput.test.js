const formatOutput = require("./formatOutput");

test("Outputs correct labels for each row", () => {
  expect(
    formatOutput([
      [0, 15, 30, 45],
      [0],
      [1, 15],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      [1, 2, 3, 4, 5],
      ["/usr/bin/find"],
    ])
  ).toBe(
    `minute        0 15 30 45\nhour          0\nday of month  1 15\nmonth         1 2 3 4 5 6 7 8 9 10 11 12\nday of week   1 2 3 4 5\ncommand       /usr/bin/find`
  );
});
