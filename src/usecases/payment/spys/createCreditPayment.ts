class CreateCreditPayment {
  public handled: boolean;

  constructor() {
    this.create = this.create.bind(this);
  }

  create(method: string) {
    if (method !== 'credit') {
      throw new Error();
    }

    this.handled = true;
  }
}

export const createCreditPayment = new CreateCreditPayment();
