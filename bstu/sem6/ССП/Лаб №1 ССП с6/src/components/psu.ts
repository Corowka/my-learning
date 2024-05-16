interface PsuProps {
  powerOutput: number;
  efficiencyRating: string;
  powerConnectors: string[];
}

export class PowerSupplyUnit {
  private _powerOutput: number;
  private _efficiencyRating: string;
  private _powerConnectors: string[];

  constructor({ powerOutput, efficiencyRating, powerConnectors }: PsuProps) {
    this._powerOutput = powerOutput;
    this._efficiencyRating = efficiencyRating;
    this._powerConnectors = powerConnectors;
  }

  get powerOutput(): number {
    return this._powerOutput;
  }

  get efficiencyRating(): string {
    return this._efficiencyRating;
  }

  get powerConnectors(): string[] {
    return this._powerConnectors;
  }
}
