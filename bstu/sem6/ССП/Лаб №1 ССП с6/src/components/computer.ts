import { Motherboard } from "./mb";
import { CentralProcessingUnit } from "./cpu";
import { GraphicalProcessingUnit } from "./gpu";
import { PowerSupplyUnit } from "./psu";
import { RandomAccessMemory } from "./ram";
import { SolidStateDrive } from "./ssd";

export class Computer {
  private motherboard: Motherboard;
  private psu: PowerSupplyUnit;
  private gpu: GraphicalProcessingUnit;
  private ssd: SolidStateDrive;
  private cpu: CentralProcessingUnit;
  private ram: RandomAccessMemory;

  constructor(
    motherboard: Motherboard,
    psu: PowerSupplyUnit,
    gpu: GraphicalProcessingUnit,
    ssd: SolidStateDrive,
    cpu: CentralProcessingUnit,
    ram: RandomAccessMemory
  ) {
    this.motherboard = motherboard;
    this.psu = psu;
    this.gpu = gpu;
    this.ssd = ssd;
    this.cpu = cpu;
    this.ram = ram;
  }

  displaySpecs(): void {
    console.log("Motherboard:");
    console.log(`  Socket Type: ${this.motherboard.socketType}`);
    console.log(`  Form Factor: ${this.motherboard.formFactor}`);
    console.log(`  Expansion Slots: ${this.motherboard.expansionSlots}`);

    console.log("PSU:");
    console.log(`  Power Output: ${this.psu.powerOutput}W`);
    console.log(`  Efficiency Rating: ${this.psu.efficiencyRating}`);
    console.log(`  Power Connectors: ${this.psu.powerConnectors.join(", ")}`);

    console.log("GPU:");
    console.log(`  Graphics Chip: ${this.gpu.graphicsChip}`);
    console.log(`  Video Memory Size: ${this.gpu.videoMemorySize}GB`);
    console.log(`  GPU Clock Speed: ${this.gpu.gpuClockSpeed}MHz`);

    console.log("SSD:");
    console.log(`  Capacity: ${this.ssd.capacity}GB`);
    console.log(`  Type: ${this.ssd.type}`);
    console.log(`  Read/Write Speed: ${this.ssd.readWriteSpeed}MB/s`);

    console.log("CPU:");
    console.log(`  Clock Speed: ${this.cpu.clockSpeed}GHz`);
    console.log(`  Number of Cores: ${this.cpu.numberOfCores}`);
    console.log(`  Cache Memory: ${this.cpu.cacheMemory}MB`);

    console.log("RAM:");
    console.log(`  Capacity: ${this.ram.capacity}GB`);
    console.log(`  Type: ${this.ram.type}`);
    console.log(`  Frequency: ${this.ram.frequency}MHz\n`);
  }

  static findHighestClockSpeed(computers: Computer[]): {
    maxClockSpeed: number;
    indexOfMax: number;
  } {
    let maxClockSpeed = Number.MIN_VALUE;
    let indexOfMax = 0;
    computers.forEach((computer, index) => {
      if (computer.cpu.clockSpeed > maxClockSpeed) {
        maxClockSpeed = computer.cpu.clockSpeed;
        indexOfMax = index;
      }
    });
    return { maxClockSpeed, indexOfMax };
  }
}
