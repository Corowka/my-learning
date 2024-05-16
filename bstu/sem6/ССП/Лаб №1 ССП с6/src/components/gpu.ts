interface GpuProps {
  graphicsChip: string;
  videoMemorySize: number;
  gpuClockSpeed: number;
}

export class GraphicalProcessingUnit {
  private _graphicsChip: string;
  private _videoMemorySize: number;
  private _gpuClockSpeed: number;

  constructor({ graphicsChip, videoMemorySize, gpuClockSpeed }: GpuProps) {
    this._graphicsChip = graphicsChip;
    this._videoMemorySize = videoMemorySize;
    this._gpuClockSpeed = gpuClockSpeed;
  }

  get graphicsChip(): string {
    return this._graphicsChip;
  }

  get videoMemorySize(): number {
    return this._videoMemorySize;
  }

  get gpuClockSpeed(): number {
    return this._gpuClockSpeed;
  }
}
