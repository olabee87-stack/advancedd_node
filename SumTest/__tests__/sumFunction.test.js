"use strict";

const functions = require("../sumFunction");

describe("Test if functions are defined", () => {
  //sum
  test("function sum is defined", () => {
    expect(functions.sum).toBeDefined();
  });

  //subtraction
  test("function subtract is defined", () => {
    expect(functions.subtract).toBeDefined();
  });

  //division
  test("function division is defined", () => {
    expect(functions.division).toBeDefined();
  });
});

//test that numbers are integers
describe("test sum with integer testcases", () => {
  const testCases = [
    [1, 1, 2],
    [2, 3, 5],
    [-2, -4, -6],
    [-2, 4, 2],
    [2, -4, -2],
    [0, 0, 0],
    [0, 3, 3],
    [3, 0, 3],
    [0, -3, -3],
    [-3, 0, -3],
  ];

  //sum
  test.each(testCases)("sum(%s, %s) = %s", (a, b, expected) => {
    expect(functions.sum(a, b)).toBe(expected);
  });
});

//test if input is not a float
describe("test sum with floating point testcases", () => {
  const testCases = [
    [10, 11.5, 21.5],
    [2.5, 3, 5.5],
    [-2.5, -2.5, -5],
    [2.5, 2.5, 5],
    [-2.5, 2.5, 0],
    [2.4, -2.5, -0.1],
  ];

  //sum
  test.each(testCases)("sum(%s, %s) = %s", (a, b, expected) => {
    expect(functions.sum(a, b)).toBeCloseTo(expected);
  });
});

//@check if parameters are missing - sum
describe("Missing parameters", () => {
  const testCases = [
    [null, "parameter missing"],
    [1, "parameter missing"],
    ["a", "parameter missing"],
    ["", "parameter missing"],
  ];

  test.each(testCases)(
    "sum(%s)) throws exception: %s",
    (testValue, expected) => {
      expect(() => functions.sum(testValue)).toThrow(expected);
    }
  );
});

//@check if paramaters are not numbers - sum
describe("Parameters are not numbers", () => {
  const testCases = [
    ["a", 2, "only numbers allowed"],
    [1, "a", "only numbers allowed"],
    ["a", "b", "only numbers allowed"],
    ["", "", "only numbers allowed"],
    [null, 1, "parameter missing"],
    [undefined, 1, "parameter missing"],
  ];

  test.each(testCases)(
    "sum(%s,%s) throws an exception %s",
    (a, b, expected) => {
      expect(() => functions.sum(a, b)).toThrow(expected);
    }
  );
});

//@SUBTRACTION TEST

//@check if parameters are missing - subtraction
describe("Missing Parameters", () => {
  const testCases = [
    [null, "parameter missing"],
    [1, "parameter missing"],
    ["a", "parameter missing"],
    ["", "parameter missing"],
  ];

  test.each(testCases)(
    "subtract(%s) throws an exception: %s",
    (testValue, expected) => {
      expect(() => functions.subtract(testValue).toThrow(expected));
    }
  );
});

//@ subtract -check if parameters are not numbers

describe("Parameters are not numbers", () => {
  const testCases = [
    ["a", 2, "only nmbers are allowed"],
    [1, "a", "only numbers are allowed"],
    ["a", "b", "only numbers are allowed"],
    ["", "", "only numbers are allowed"],
    [null, 1, "only numbers are allowed"],
    [undefined, 1, "only numbers are allowed"],
  ];

  test.each(testCases)(
    "subtract(%s,%s) throws an exception %s",
    (a, b, expected) => {
      expect(() => functions.subtract(a, b).toThrow(expected));
    }
  );
});

//@DIVISION TEST

describe("Missing Parameters", () => {
  const testCases = [
    [null, "parameter missing"],
    [1, "parameter missing"],
    ["a", "parameter missing"],
    ["", "parameter missing"],
  ];

  test.each(testCases)(
    "division(%s) throws an exception: %s",
    (testValue, expected) => {
      expect(() => functions.division(testValue).toThrow(expected));
    }
  );
});

//@ division -check if parameters are not numbers

describe("Parameters are not numbers", () => {
  const testCases = [
    ["a", 2, "only nmbers are allowed"],
    [1, "a", "only numbers are allowed"],
    ["a", "b", "only numbers are allowed"],
    ["", "", "only numbers are allowed"],
    [null, 1, "only numbers are allowed"],
    [undefined, 1, "only numbers are allowed"],
  ];

  test.each(testCases)(
    "division(%s,%s) throws an exception %s",
    (a, b, expected) => {
      expect(() => functions.division(a, b).toThrow(expected));
    }
  );
});
