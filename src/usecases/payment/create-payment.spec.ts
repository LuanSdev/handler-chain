import { HandlerChain } from '@/handler-chain';
import { createCreditPayment } from './spys/createCreditPayment';
import { createSlipPayment } from './spys/createSlipPayment';

type PaymentMethod = 'credit' | 'slip';

class CreatePayment {
  constructor(private readonly handlerChain: HandlerChain<PaymentMethod>) {}

  async create() {
    await this.handlerChain
      .nextHandler(createSlipPayment.create)
      .nextHandler(createCreditPayment.create)
      .handle({ errorMessage: 'Incorrect method.' });
  }
}

const makeSut = (method: PaymentMethod) => {
  const paymentChain = new HandlerChain<PaymentMethod>(method);
  const sut = new CreatePayment(paymentChain);

  return { sut };
};

describe('CreatePayment', () => {
  beforeEach(() => {
    createCreditPayment.handled = false;
    createSlipPayment.handled = false;
  });

  it('Should createSLipPayment handled', async () => {
    const { sut } = makeSut('slip');

    await sut.create();

    expect(createSlipPayment.handled).toBe(true);
    expect(createCreditPayment.handled).not.toBe(true);
  });
  it('Should createCreditPayment handled', async () => {
    const { sut } = makeSut('credit');

    await sut.create();

    expect(createCreditPayment.handled).toBe(true);
    expect(createSlipPayment.handled).not.toBe(true);
  });
});
