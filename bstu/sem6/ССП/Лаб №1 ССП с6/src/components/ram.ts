interface RAMProps {
  capacity: number;
  type: string;
  frequency: number;
}

export class RandomAccessMemory {
  private _capacity: number;
  private _type: string;
  private _frequency: number;

  constructor({ capacity, type, frequency }: RAMProps) {
    this._capacity = capacity;
    this._type = type;
    this._frequency = frequency;
  }

  get capacity(): number {
    return this._capacity;
  }

  get type(): string {
    return this._type;
  }

  get frequency(): number {
    return this._frequency;
  }
}
