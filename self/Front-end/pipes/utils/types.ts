export type Point = {
  x: number
  y: number
}

export type Plan = {
  warmFloor: Point[]
}

export type WarmFloorPlan = Plan & {
  wirePoints: Point[]
}

export type ServerWarmFloorParams = {
  matrix: number[][]
  shape: number
  padding: number
  space: number
  floorType: string
}