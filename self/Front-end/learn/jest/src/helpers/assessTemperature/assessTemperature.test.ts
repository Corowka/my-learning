import { assessTemperature } from "./assessTemperature";

describe("assessTemperature", () => {
  test("Hot", () => expect(assessTemperature(1000)).toEqual("Hot"));
  test("Hot Corner", () => expect(assessTemperature(25)).toEqual("Hot"));
  test("Warm", () => expect(assessTemperature(20)).toEqual("Warm"));
  test("Warm Corner", () => expect(assessTemperature(15)).toEqual("Warm"));
  test("Good", () => expect(assessTemperature(10)).toEqual("Good"));
  test("Good Corner", () => expect(assessTemperature(5)).toEqual("Good"));
  test("Cold", () => expect(assessTemperature(-1000)).toEqual("Cold"));
});
