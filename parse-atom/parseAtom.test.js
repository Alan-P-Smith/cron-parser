const parseAtom = require("./parseAtom");

describe("All values (*)", () => {
  test("Does * return all values within limit", () => {
    expect(parseAtom("*", 5)).toEqual([0, 1, 2, 3, 4, 5]);
  });
});

describe("Range (-)", () => {
  test("Does - return all values in range", () => {
    expect(parseAtom("1-5", 5)).toEqual([1, 2, 3, 4, 5]);
  });

  test("Does - error when a value exceeds the lower bounds", () => {
    expect(() => parseAtom("0-5", 10, 1)).toThrow("Range exceeded bounds");
  });

  test("Does - error when a value exceeds the upper bounds", () => {
    expect(() => parseAtom("1-10", 5)).toThrow("Range exceeded bounds");
  });
});

describe("Specific values (,)", () => {
  test("Does , return all specific values", () => {
    expect(parseAtom("0,10,30,40", 59)).toEqual([0, 10, 30, 40]);
  });

  test("Does , error when a value exceeds the lower bounds", () => {
    expect(() => parseAtom("0,10,30,40", 50, 1)).toThrow(
      "Explicit value exceeded bounds"
    );
  });

  test("Does , error when a value exceeds the upper bounds", () => {
    expect(() => parseAtom("0,10,30,40", 1)).toThrow(
      "Explicit value exceeded bounds"
    );
  });
});

describe("Increments (/)", () => {
  test("Does / return correct increments", () => {
    expect(parseAtom("0/15", 59)).toEqual([0, 15, 30, 45]);
  });

  test("Does / return correct increments when giving a starting value", () => {
    expect(parseAtom("5/15", 59)).toEqual([5, 20, 35, 50]);
  });

  test("Does / return correct increments when using * shorthand", () => {
    expect(parseAtom("*/15", 59)).toEqual([0, 15, 30, 45]);
  });

  test("Does / correctly resolve to the lower limit when using the * shorthand", () => {
    expect(parseAtom("*/10", 31, 1)).toEqual([1, 11, 21, 31]);
  });

  test("Does / throw when starting value exceeds the lower limit", () => {
    expect(() => parseAtom("0/15", 59, 1)).toThrow(
      "Starting increment exceeded bounds"
    );
  });

  test("Does / throw when starting value exceeds upper limit", () => {
    expect(() => parseAtom("60/15", 59)).toThrow(
      "Starting increment exceeded bounds"
    );
  });
});
