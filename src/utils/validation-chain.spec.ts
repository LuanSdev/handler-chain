import { ChainValidation } from './chain-validation';

class ValidationChain {
  protected data: any;

  async execute(method: () => Promise<void>): Promise<ChainValidation> {
    await method();
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

  it('Should calls provided method', async () => {
    const { sut } = makeSut();

    class SomeClass {
      public callsCount: number;
      constructor() {
        this.callsCount = 0;
      }

      async someMethod() {
        this.callsCount++;
      }
    }

    const someClass = new SomeClass();

    await sut.execute(() => someClass.someMethod());
    expect(someClass.callsCount).toBe(1);
  });
});
