import { Computer } from "../components/computer";
import { Motherboard } from "../components/mb";
import { CentralProcessingUnit } from "../components/cpu";
import { GraphicalProcessingUnit } from "../components/gpu";
import { PowerSupplyUnit } from "../components/psu";
import { RandomAccessMemory } from "../components/ram";
import { SolidStateDrive } from "../components/ssd";

export const computer1 = new Computer(
  new Motherboard({
    socketType: "LGA1200",
    formFactor: "MicroATX",
    expansionSlots: 2,
  }),
  new PowerSupplyUnit({
    powerOutput: 650,
    efficiencyRating: "80 Plus Bronze",
    powerConnectors: ["ATX", "PCIe"],
  }),
  new GraphicalProcessingUnit({
    graphicsChip: "AMD Radeon RX 6700 XT",
    videoMemorySize: 12,
    gpuClockSpeed: 2424,
  }),
  new SolidStateDrive({ capacity: 2000, type: "SATA", readWriteSpeed: 550 }),
  new CentralProcessingUnit({
    clockSpeed: 4.2,
    numberOfCores: 6,
    cacheMemory: 12,
  }),
  new RandomAccessMemory({ capacity: 32, type: "DDR4", frequency: 3600 })
);
