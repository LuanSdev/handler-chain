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
  it('Should createSLipPayment handled', async () => {
    const { sut } = makeSut('slip');

    await sut.create();

    expect(createSlipPayment.handled).toBe(true);
    expect(createCreditPayment.handled).not.toBe(true);
  });
});
