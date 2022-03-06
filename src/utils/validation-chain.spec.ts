import { IChainValidator } from './protocols/chain-validator';

class ChainValidatorSpy implements IChainValidator {
  async next(nextMethod: () => Promise<any>): Promise<IChainValidator> {
    await nextMethod();
    return this;
  }
}
class ValidationChain {
  private readonly chainValidator: IChainValidator;

  constructor({ chainValidator }) {
    this.chainValidator = chainValidator;
  }

  protected data: any;

  async execute(method: () => Promise<void>): Promise<IChainValidator> {
    await method();
    return this.chainValidator;
  }
}

const makeSut = () => {
  const chainValidatorSpy = new ChainValidatorSpy();

  const sut = new ValidationChain({ chainValidator: chainValidatorSpy });

  return { sut, chainValidatorSpy };
};

class SomeClass {
  public callsCount: number;
  constructor() {
    this.callsCount = 0;
  }

  async someMethod() {
    this.callsCount++;
  }
}

const makeSomeClass = () => {
  return new SomeClass();
};

describe('Validation chain', () => {
  it('Should return an object with next function', async () => {
    const { sut } = makeSut();

    const someClass = new SomeClass();
    const response = await sut.execute(async () => someClass.someMethod());

    expect(response.next instanceof Function).toBe(true);
  });

  it('Should calls provided method', async () => {
    const { sut } = makeSut();

    const someClass = makeSomeClass();

    await sut.execute(() => someClass.someMethod());
    expect(someClass.callsCount).toBe(1);
  });
});
