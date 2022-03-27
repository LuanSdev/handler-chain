import { HandlerChain } from '@/handler-chain';
import { IPaymentHandler } from './protocols/payment-handler';

type PaymentMethod = 'credit' | 'slip';

export class CreatePaymentChain extends HandlerChain {
  constructor(private readonly paymentHandlers: IPaymentHandler<any>[]) {
    super();
  }

  async create(paymentMethod: PaymentMethod) {
    this.data = paymentMethod;

    this.paymentHandlers.forEach((paymentHandler) => {
      this.nextHandler(paymentHandler.create);
    });

    await this.handle({ errorMessage: 'Invalid payment method.' });
  }
}
