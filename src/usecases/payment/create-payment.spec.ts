import { CreatePaymentChain } from './create-payment';
import { createCreditPayment } from './spys/createCreditPayment';
import { createSlipPayment } from './spys/createSlipPayment';

const makeSut = () => {
  const sut = new CreatePaymentChain([createCreditPayment, createSlipPayment]);

  return { sut };
};

describe('CreatePaymentChain', () => {
  beforeEach(() => {
    createCreditPayment.handled = false;
    createSlipPayment.handled = false;
  });

  it('Should createSLipPayment handled', async () => {
    const { sut } = makeSut();

    await sut.create('slip');

    expect(createSlipPayment.handled).toBe(true);
    expect(createCreditPayment.handled).not.toBe(true);
  });
  it('Should createCreditPayment handled', async () => {
    const { sut } = makeSut();

    await sut.create('credit');

    expect(createCreditPayment.handled).toBe(true);
    expect(createSlipPayment.handled).not.toBe(true);
  });
});
