"use strict";

// This demo shows the order in which tests are run
// This actually test nothing
// but only prints out to the console what is run

// 1
beforeAll(() => {
  console.log("beforeAll", "init before all tests".toUpperCase());
});

// 3
afterAll(() => {
  console.log("afterAll", "clearning after all tests".toUpperCase());
});

// 2
test("This is not in thest suit", () => {
  console.log("Test", "just some test");
});

// mocha method it
it("This is not in thest suit", () => {
  console.log("Test", "just some test");
});

// Create a test suite
describe("This is a test suit", () => {
  beforeEach(() => {
    console.log("beforeEach", "init before every test");
  });
  afterEach(() => {
    console.log("afterEach", "cleaning after every test in suit 1");
  });
  test("run test A of the first suite", () => {
    console.log("Test A");
  });
  test("run test B of the first suite", () => {
    console.log("Test B");
  });
  test("run test C of the first suit", () => {
    console.log("Test C");
  });
});

describe("This is another suite (suite 2)", () => {
  beforeAll(() => {
    console.log("beforeAll2", "init before all tests in suite 2");
  });
  afterAll(() => {
    console.log("afterAll2", "cleaning after all tests in suite 2");
  });

  describe('This is the first "subsuite"', () => {
    test("testD of the first subsuite of suit 2", () => {
      console.log("Test D");
    });
    test("testE of the first subsuite of suit 2", () => {
      console.log("Test E");
    });
  });

  describe('This is the second "subsuite" of suite 2', () => {
    beforeEach(() => {
      console.log("beforeEach", "init test in subsuite 2 of suite 2");
    });
    test("testF of the second subsuite of suite 2", () => {
      console.log("Test F");
    });
    test("testG of the second subsuite of suite 2", () => {
      console.log("Test G");
    });
  });
});

describe("This tests for an exception", () => {
  function testFunction() {
    throw Error("This is an exception");
  }
  test("Test if function throws an exception", () => {
    expect(() => testFunction()).toThrow("This is an exception");
    // expect(() => testFunction()).toThrow('This is an exceptionsadasda');
  });
});

describe("This tests an asynchronous function", () => {
  test("Test promise resolve", () => {
    expect(Promise.resolve("resolved")).resolves.toBe("resolved");
  });
  test("Test promise reject", () => {
    expect(Promise.reject("rejected")).rejects.toBe("rejected");
  });
});

describe("Test wtih array of test values", () => {
  const testValues = [
    ["first", "second", "firstsecond"],
    ["je", "st", "jest"],
  ];
  const concat = (part1, part2) => part1 + part2;

  // ['first', 'second', 'firstsecond'] = (a, b, expected)
  // Jest %s = String
  test.each(testValues)("%s and %s = %s", (a, b, expected) => {
    expect(concat(a, b)).toBe(expected);
  });

  // followings are different way to do the same as with test.each
  test("first and second = firstsecond", () => {
    expect(concat("first", "second")).toBe("firstsecond");
  });
  test("je and st = jest", () => {
    expect(concat("je", "st")).toBe("jest");
  });
  test(`${testValues[0][0]} and ${testValues[0][1]} = ${testValues[0][2]}`, () => {
    expect(concat(testValues[0][0], testValues[0][1])).toBe(testValues[0][2]);
  });
  for (let value of testValues) {
    test(`${value[0]} and ${value[1]} = ${value[2]}`, () => {
      expect(concat(value[0], value[1])).toBe(value[2]);
    });
  }
});
