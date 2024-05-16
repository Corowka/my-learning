import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const ClockSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Circle cx={12} cy={12} r={10} stroke="#fafafa" strokeWidth={1.5} />
    <Path
      stroke="#fafafa"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 8v4l2.5 2.5"
    />
  </Svg>
);
export default ClockSvg;
