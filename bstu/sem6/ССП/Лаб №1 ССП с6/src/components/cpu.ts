interface CpuProps {
  clockSpeed: number;
  numberOfCores: number;
  cacheMemory: number;
}

export class CentralProcessingUnit {
  private _clockSpeed: number;
  private _numberOfCores: number;
  private _cacheMemory: number;

  constructor({ clockSpeed, numberOfCores, cacheMemory }: CpuProps) {
    this._clockSpeed = clockSpeed;
    this._numberOfCores = numberOfCores;
    this._cacheMemory = cacheMemory;
  }

  get clockSpeed(): number {
    return this._clockSpeed;
  }

  get numberOfCores(): number {
    return this._numberOfCores;
  }

  get cacheMemory(): number {
    return this._cacheMemory;
  }
}
