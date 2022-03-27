export interface IPaymentHandler<TPaymentType> {
  create(data: TPaymentType): Promise<void>;
}
