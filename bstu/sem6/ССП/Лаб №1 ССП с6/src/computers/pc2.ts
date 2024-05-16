import { Computer } from "../components/computer";
import { Motherboard } from "../components/mb";
import { CentralProcessingUnit } from "../components/cpu";
import { GraphicalProcessingUnit } from "../components/gpu";
import { PowerSupplyUnit } from "../components/psu";
import { RandomAccessMemory } from "../components/ram";
import { SolidStateDrive } from "../components/ssd";

export const computer2 = new Computer(
  new Motherboard({ socketType: "AM4", formFactor: "ATX", expansionSlots: 4 }),
  new PowerSupplyUnit({
    powerOutput: 750,
    efficiencyRating: "80 Plus Gold",
    powerConnectors: ["ATX", "PCIe"],
  }),
  new GraphicalProcessingUnit({
    graphicsChip: "NVIDIA GeForce RTX 3080",
    videoMemorySize: 10,
    gpuClockSpeed: 1710,
  }),
  new SolidStateDrive({ capacity: 1000, type: "NVMe", readWriteSpeed: 3500 }),
  new CentralProcessingUnit({
    clockSpeed: 3.6,
    numberOfCores: 8,
    cacheMemory: 16,
  }),
  new RandomAccessMemory({ capacity: 16, type: "DDR4", frequency: 3200 })
);
