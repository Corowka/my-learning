import { computer1 } from "./computers/pc1";
import { computer2 } from "./computers/pc2";
import { computer3 } from "./computers/pc3";
import { Computer } from "./components/computer";

computer1.displaySpecs();
computer2.displaySpecs();
computer3.displaySpecs();

const computers = [computer1, computer2, computer3];
const { indexOfMax, maxClockSpeed } = Computer.findHighestClockSpeed(computers);
console.log(`Highest clock speed is ${maxClockSpeed} in ${indexOfMax + 1} pc`);
