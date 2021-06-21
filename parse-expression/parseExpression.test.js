const parseExpression = require("./parseExpression");

test("Does a valid cron expression with a 6th string correctly return", () => {
  expect(parseExpression("0 0 1 1 1 command")).toEqual([
    [0],
    [0],
    [1],
    [1],
    [1],
    ["command"],
  ]);
});

test("Does it throw if 6 params arent provided", () => {
  expect(() => parseExpression("0 0 1 1 1")).toThrow(
    "Incorrect number of parameters provided"
  );
});

test("Does it correctly output a complex cron expression", () => {
  expect(parseExpression("*/15 0 1,15 * 1-5 /usr/bin/find")).toEqual([
    [0, 15, 30, 45],
    [0],
    [1, 15],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    [1, 2, 3, 4, 5],
    ["/usr/bin/find"],
  ]);
});
