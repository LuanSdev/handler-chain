export class ChainValidation {
  public constructor() {
    Object.assign(this, this);
  }

  async next(method: () => Promise<any>): Promise<ChainValidation> {
    return new ChainValidation();
  }
}
