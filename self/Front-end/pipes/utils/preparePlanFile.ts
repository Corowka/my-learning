import { Plan, Point } from "./types"

export const preparePlanFile = (planFile: string): Plan | null => {
  try {
    const plan = JSON.parse(planFile);
    const id_floor = Object.keys(plan.plan.warm_floors)[0];
    const warmFloor: Point[] = plan.plan.warm_floors[id_floor].polygon;
    return { warmFloor };
  } catch (e: any) {
    console.error(e.message);
    return null;
  }
}