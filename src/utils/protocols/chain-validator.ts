export interface IChainValidator {
  next(nextMethod: () => Promise<any>): Promise<IChainValidator>;
}
