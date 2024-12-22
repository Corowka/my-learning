import { TemperatureCondition } from "./types";

export const assessTemperature = (
  temperature: number
): TemperatureCondition => {
  if (temperature < 5) return "Cold";
  if (temperature < 15) return "Good";
  if (temperature < 25) return "Warm";
  return "Hot";
};
