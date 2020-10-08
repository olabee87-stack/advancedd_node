"use strict";

const Dice = require("../dice.js");

describe("0. methods defined", () => {
  let dice;

  beforeEach(() => {
    dice = new Dice();
  });

  test("getter maximumValue defined", () => {
    expect(dice.maximumValue).toBeDefined();
  });

  test("roll is defined", () => {
    expect(dice.roll).toBeDefined();
  });
});

describe("1. Create a dice with no upper bound", () => {
  let dice;

  beforeEach(() => {
    dice = new Dice();
  });

  test("upper bound is 6", () => {
    expect(dice.maximumValue).toBe(6);
  });

  test("lower bound is 1", () => {
    expect(dice.minimumValue).toBe(1);
  });
});

describe("2. and 5. Create a dice with given upper bound", () => {
  const upperBounds = new Array(20).fill(1).map((value, ind) => [value + ind]);

  test.each(upperBounds)("test upper bound %s", (upperBound) => {
    let dice = new Dice(upperBound);
    expect(dice.maximumValue).toBe(upperBound);
  });
});

describe("3. Test exceptions with wrong upper bounds", () => {
  const testCases = [
    [21, "Upper bound too big"],
    [-1, "Upper bound too small"],
    [0, "Upper bound too small"],
    ["a", "Upper bound must be an integer"],
    [2.5, "Upper bound must be an integer"],
  ];

  test.each(testCases)(
    "upper bound %s throws an eception %s",
    (upperBound, expected) => {
      expect(() => {
        new Dice(upperBound);
      }).toThrow(expected);
    }
  );
});

describe("6. test roll", () => {
  let dice;
  beforeEach(() => {
    dice = new Dice();
  });

  test("test when the dice hasn't been rolled", () => {
    expect(dice.dots).toBe(0);
  });

  test("test when rolled", () => {
    dice.roll();
    // expect.assertions(2);
    expect(dice.dots).toBeGreaterThanOrEqual(1);
    expect(dice.dots).toBeLessThanOrEqual(6);
  });
});

describe("8 and 9 Testing toString", () => {
  let dice;

  beforeEach(() => {
    dice = new Dice();
  });

  test("dice not rolled yet", () => {
    expect(dice.toString()).toBe("Not rolled yet");
  });

  test("dice rolled", () => {
    dice.roll();
    expect(dice.toString()).toBe(`${dice.dots}`);
  });
});
