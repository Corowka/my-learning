import { Point, ServerWarmFloorParams } from "@/utils/types"
import { Design } from "./canvas"

interface isPointInsidePolygonProps {
  point: Point
  polygon: Point[]
}

export const isPointInsidePolygon = ({ point, polygon }: isPointInsidePolygonProps): boolean => {
  let index = 0;
  for (let i = 0; i < polygon.length; i++) {
    const j = (i + 1) % polygon.length;
    if (polygon[i].y <= point.y && point.y < polygon[j].y || polygon[j].y <= point.y && point.y < polygon[i].y) {
      if (polygon[i].x + (point.y - polygon[i].y) * (polygon[j].x - polygon[i].x) / (polygon[j].y - polygon[i].y) < point.x) {
        index += 1;
      }
    }
  }
  return index % 2 !== 0;
}

interface minDistanceToPolygonSideProps {
  point: Point
  polygon: Point[]
}

export const minDistanceToPolygonSide = ({ point, polygon }: minDistanceToPolygonSideProps): number => {
  let minDistance = Infinity;

  const distanceSquared = (p1: Point, p2: Point): number => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return dx * dx + dy * dy;
  }

  for (let i = 0; i < polygon.length; i++) {
    const j = (i + 1) % polygon.length;
    const sideStart = polygon[i];
    const sideEnd = polygon[j];
    const vectorStartToPoint = {
      x: point.x - sideStart.x,
      y: point.y - sideStart.y
    };
    const vectorStartToEnd = {
      x: sideEnd.x - sideStart.x,
      y: sideEnd.y - sideStart.y
    };
    const dotProduct = vectorStartToPoint.x * vectorStartToEnd.x + vectorStartToPoint.y * vectorStartToEnd.y;
    if (dotProduct < 0) {
      const distance = distanceSquared(point, sideStart);
      minDistance = Math.min(minDistance, distance);
    }
    else if (dotProduct > distanceSquared(sideEnd, sideStart)) {
      const distance = distanceSquared(point, sideEnd);
      minDistance = Math.min(minDistance, distance);
    }
    else {
      const perpendicularProjection = {
        x: sideStart.x + (dotProduct / distanceSquared(sideEnd, sideStart)) * vectorStartToEnd.x,
        y: sideStart.y + (dotProduct / distanceSquared(sideEnd, sideStart)) * vectorStartToEnd.y
      };
      const distance = distanceSquared(point, perpendicularProjection);
      minDistance = Math.min(minDistance, distance);
    }
  }

  return Math.sqrt(minDistance);
}

interface getMinMaxProps {
  polygon: Point[]
  windowSize: {
    width: number
    height: number
  }
  pad: number
}

export const getMinMax = ({ polygon, windowSize, pad }: getMinMaxProps) => {
  const maxX = polygon.reduce((maximum, p) => Math.max(p.x, maximum), 0);
  const minX = polygon.reduce((minimum, p) => Math.min(p.x, minimum), windowSize.width);
  const maxY = polygon.reduce((maximum, p) => Math.max(p.y, maximum), 0);
  const minY = polygon.reduce((minimum, p) => Math.min(p.y, minimum), windowSize.height);
  return { minX, maxX, minY, maxY }
}

interface getCenteredPolygonProps {
  polygon: Point[]
  pad: number
  windowSize: {
    width: number
    height: number
  }
  minX: number
  maxX: number
  minY: number
  maxY: number
}

export const getCenteredPolygon = ({ polygon, pad, windowSize, minX, maxX, minY, maxY }: getCenteredPolygonProps) => {
  const scaleX = (windowSize.width - pad * 2) / (maxX - minX);
  const scaleY = (windowSize.height - pad * 2) / (maxY - minY);
  const scale = (scaleX < scaleY) ? scaleX : scaleY;
  const padX = (scaleX > scaleY) ? (scaleX - scaleY) * (maxX - minX) / 2 : 0;
  const padY = (scaleX < scaleY) ? -(scaleX - scaleY) * (maxY - minY) / 2 : 0;
  const centeredPolygon: Point[] = polygon.map(p => ({
    x: (p.x - minX) * scale + pad + padX - 12,
    y: (p.y - minY) * scale + pad + padY - 12
  } as Point));

  return { scaleX, scaleY, scale, padX, padY, centeredPolygon }
}

interface getWirePolygonPointsProps {
  polygon: Point[]
  windowSize: {
    width: number
    height: number
  }
  pad: number
  minX: number
  maxX: number
  minY: number
  maxY: number
  padding: number
  space: number
  scale: number,
  scaleX: number, scaleY: number,
  padX: number, padY: number, warmFloorPolygon: Point[]
}

export const getWirePolygonPoints = ({
  polygon, windowSize,
  minX, maxX, minY, maxY, pad,
  padding, space,
  scale, scaleX, scaleY,
  padX, padY, warmFloorPolygon
}: getWirePolygonPointsProps) => {
  const points: Point[] = [];
  const matrix: number[][] = [];
  let i = minX + padding;
  let j = minY + padding;
  while (j < maxY) {
    const temp = []
    while (i < maxX) {
      const p: Point = { x: i, y: j }
      if (isPointInsidePolygon({ point: p, polygon: polygon }) &&
        minDistanceToPolygonSide({ point: p, polygon: polygon }) >= padding) {
        temp.push(1);
        points.push(p);
      }
      else {
        temp.push(0);
      }
      i += space;
    }
    if (temp.length) {
      matrix.push(temp);
    }
    i = minX + padding;
    j += space;
  }
  let paint = "";
  matrix.forEach((row, i) => {
    for (let k = 0; k < matrix[i].length; k++) {
      paint += (matrix[i][k] === 1) ? "." : "#";
    }
    paint += "\n";
  });
  console.log(paint);
  const wirePoints: Point[] = points
  const wirePointsScaled = wirePoints
    .map(p => ({
      x: (p.x - minX) * scale + pad + padX,
      y: (p.y - minY) * scale + pad + padY
    }))
  return { wirePoints: wirePointsScaled, matrix }
}