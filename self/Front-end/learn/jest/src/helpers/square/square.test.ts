import { square } from "./square";

describe("square", () => {
  let value = 0;
  beforeAll(() => (value = 10));
  beforeEach(() => (value += Math.random()));
  test("2^2", () => expect(square(2)).toBe(4));
  test("not Nan", () => expect(square(2)).not.toBeNaN());
  test("not Undefined", () => expect(square(2)).not.toBeUndefined());
  test("2^2<5", () => expect(square(2)).toBeLessThan(5));
  test("2^2>3", () => expect(square(2)).toBeGreaterThan(3));
  test("Math.pow called", () => {
    // mock function
    const spyMathPow = jest.spyOn(Math, "pow");
    square(2);
    expect(spyMathPow).toBeCalledTimes(1);
  });
  test("Math.pow not called", () => {
    // mock function
    const spyMathPow = jest.spyOn(Math, "pow");
    square(1);
    expect(spyMathPow).toBeCalledTimes(0);
  });
  afterEach(() => {
    value **= 1.01;
    jest.clearAllMocks();
  });
  afterAll(() => console.log(value));
});
