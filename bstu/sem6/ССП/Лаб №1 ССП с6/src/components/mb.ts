interface MotherboardProps {
  socketType: string;
  formFactor: string;
  expansionSlots: number;
}

export class Motherboard {
  private _socketType: string;
  private _formFactor: string;
  private _expansionSlots: number;

  constructor({ socketType, formFactor, expansionSlots }: MotherboardProps) {
    this._socketType = socketType;
    this._formFactor = formFactor;
    this._expansionSlots = expansionSlots;
  }

  get socketType(): string {
    return this._socketType;
  }

  get formFactor(): string {
    return this._formFactor;
  }

  get expansionSlots(): number {
    return this._expansionSlots;
  }
}
