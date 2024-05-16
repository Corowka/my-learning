import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const AlarmSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Circle
      cx={12}
      cy={13}
      r={9}
      stroke="#fafafa"
      strokeWidth={1.5}
      opacity={0.5}
    />
    <Path
      stroke="#fafafa"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 9v4l2.5 2.5M3.5 4.5l4-2.5M20.5 4.5l-4-2.5"
    />
  </Svg>
);
export default AlarmSvg;
