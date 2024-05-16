interface SSDProps {
  capacity: number;
  type: string;
  readWriteSpeed: number;
}

export class SolidStateDrive {
  private _capacity: number;
  private _type: string;
  private _readWriteSpeed: number;

  constructor({ capacity, type, readWriteSpeed }: SSDProps) {
    this._capacity = capacity;
    this._type = type;
    this._readWriteSpeed = readWriteSpeed;
  }

  get capacity(): number {
    return this._capacity;
  }

  get type(): string {
    return this._type;
  }

  get readWriteSpeed(): number {
    return this._readWriteSpeed;
  }
}
