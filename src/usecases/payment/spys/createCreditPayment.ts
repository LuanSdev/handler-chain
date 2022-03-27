import { IPaymentHandler } from '../protocols/payment-handler';

class CreateCreditPayment implements IPaymentHandler<'credit'> {
  public handled: boolean;

  constructor() {
    this.create = this.create.bind(this);
  }

  async create(method: string) {
    if (method !== 'credit') {
      throw new Error();
    }

    this.handled = true;
  }
}

export const createCreditPayment = new CreateCreditPayment();
