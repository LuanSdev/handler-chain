class CreateSlipPayment {
  public handled: boolean;

  constructor() {
    this.create = this.create.bind(this);
  }

  create(method: string) {
    if (method !== 'slip') {
      throw new Error();
    }

    this.handled = true;
  }
}

export const createSlipPayment = new CreateSlipPayment();
