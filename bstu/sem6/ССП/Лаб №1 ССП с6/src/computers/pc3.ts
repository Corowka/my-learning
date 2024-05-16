import { Computer } from "../components/computer";
import { Motherboard } from "../components/mb";
import { CentralProcessingUnit } from "../components/cpu";
import { GraphicalProcessingUnit } from "../components/gpu";
import { PowerSupplyUnit } from "../components/psu";
import { RandomAccessMemory } from "../components/ram";
import { SolidStateDrive } from "../components/ssd";

export const computer3 = new Computer(
  new Motherboard({
    socketType: "LGA1700",
    formFactor: "ATX",
    expansionSlots: 3,
  }),
  new PowerSupplyUnit({
    powerOutput: 850,
    efficiencyRating: "80 Plus Platinum",
    powerConnectors: ["ATX", "PCIe"],
  }),
  new GraphicalProcessingUnit({
    graphicsChip: "NVIDIA GeForce RTX 4090",
    videoMemorySize: 24,
    gpuClockSpeed: 2600,
  }),
  new SolidStateDrive({ capacity: 4000, type: "NVMe", readWriteSpeed: 7000 }),
  new CentralProcessingUnit({
    clockSpeed: 5.0,
    numberOfCores: 12,
    cacheMemory: 24,
  }),
  new RandomAccessMemory({ capacity: 64, type: "DDR5", frequency: 4800 })
);
