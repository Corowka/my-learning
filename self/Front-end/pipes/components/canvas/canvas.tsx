import { Plan, Point, WarmFloorPlan } from "@/utils/types"
import { useEffect, useState, useMemo } from "react"
import { Stage, Layer, Line, Circle } from "react-konva"
import styles from "./canvas.module.css"
import { Toolbar } from "../toolbar/toolbar"
import { FloorForm } from "../floor-form/floor-from"
import { isPointInsidePolygon, getCenteredPolygon, getMinMax, getWirePolygonPoints } from "./utils"


interface CanvasProps {
  file: Plan
  setFile: (file: Plan | null) => void
  comebackHandler: () => void
}

export interface Design {
  warmFloorBorderWidth: number
}

export const Canvas = ({ file, setFile, comebackHandler }: CanvasProps) => {
  const [padding, setPadding] = useState<string>("10");
  const [space, setSpace] = useState<string>("10");
  const [floorType, setFloorType] = useState<string>("");
  const [validated, setValidated] = useState([false, false, false]);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth - 320 - 60, height: window.innerHeight - 61 });
  const [plan, setPlan] = useState<null | (Point[])[]>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth - 320 - 60, height: window.innerHeight - 61 });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { minX, maxX, minY, maxY, pad, polygon, scale, scaleX, scaleY, padX, padY, warmFloor } = useMemo(() => {
    const pad = Math.min(windowSize.height, windowSize.width) * 0.075;
    const polygon = file.warmFloor;
    const { minX, maxX, minY, maxY } = getMinMax({ polygon, windowSize, pad });
    const {
      scale, scaleX, scaleY, padX, padY, centeredPolygon
    } = getCenteredPolygon({ polygon, minX, maxX, minY, maxY, pad, windowSize });
    return { minX, maxX, minY, maxY, pad, polygon, scale, scaleX, scaleY, padX, padY, warmFloor: centeredPolygon };
  }, [windowSize, file]);

  const { wirePoints, matrix } = useMemo(() => {
    if (validated.some(f => f === false)) {
      return { wirePoints: null, matrix: null }
    }
    const { wirePoints, matrix } = getWirePolygonPoints({
      polygon, windowSize,
      minX, maxX, minY, maxY, pad,
      padding: Number(padding), space: Number(space),
      scale, scaleX, scaleY,
      padX, padY, warmFloorPolygon: warmFloor
    });
    return { wirePoints, matrix }
  }, [windowSize, file, padding, space, floorType, validated]);

  return (
    <>
      <FloorForm
        file={file}
        padding={padding}
        setPadding={setPadding}
        space={space}
        setSpace={setSpace}
        floorType={floorType}
        setFloorType={setFloorType}
        validated={validated}
        setValidated={setValidated}
        plan={plan}
        comebackHandler={comebackHandler}
      />
      <Stage className={styles.canvas} width={windowSize.width} height={windowSize.height}>
        {warmFloor && <Layer>
          <Line
            x={warmFloor.length}
            y={warmFloor.length}
            points={warmFloor.reduce((arr, p: Point) => arr.concat([p.x, p.y]), [] as number[])}
            tension={0}
            closed
            stroke="#fc640044"
            strokeWidth={10}
            fill="#fc640099"
          />
        </Layer>}
        {wirePoints && !validated.some(f => f === false) && <Layer>
          {wirePoints.map((p, i) =>
            <Circle key={i} x={p.x} y={p.y} fill="#131313"
              radius={Math.min(5, Math.max(1000 / wirePoints.length, 2))}
            />
          )}
        </Layer>}
      </Stage>
      <Toolbar />
    </>
  )
}