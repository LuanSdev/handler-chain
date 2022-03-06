import { ChainValidation } from './chain-validation';

class ValidationChain {
  protected data: any;

  async execute(method: () => Promise<void>): Promise<ChainValidation> {
    return new ChainValidation();
  }
}

const makeSut = () => {
  const sut = new ValidationChain();

  return { sut };
};

describe('Validation chain', () => {
  it('Should return an instance of ChainValidation', async () => {
    const { sut } = makeSut();

    const response = await sut.execute(async () => null);
    expect(response instanceof ChainValidation).toBe(true);
  });
});
