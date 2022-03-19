import { HandlerChain } from './handler-chain';

const makeSut = (data) => {
  const sut = new HandlerChain(data);

  return { sut };
};

class SomeClass {
  public data: any;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  handle(data) {
    this.data = data;
  }
}

describe('Handler chain', () => {
  it('Should set nextHandler props with correct value', async () => {
    const { sut } = makeSut('valid-data');

    const someClass = new SomeClass();

    await sut
      .nextHandler(someClass.handle)
      .handle({ errorMessage: 'any-message' });

    expect(someClass.data).toBe('valid-data');
  });

  it('Should push next handler to chain', async () => {
    const { sut } = makeSut('valid-data');
    const someClass = new SomeClass();

    sut.nextHandler(someClass.handle).nextHandler(someClass.handle);

    expect(sut.chain.length > 0).toBe(true);
  });

  it('Should throw a default error if no handler has success', async () => {
    const { sut } = makeSut('valid-data');
    const someClass = new SomeClass();
    someClass.handle = () => {
      throw new Error();
    };

    const promise = sut
      .nextHandler(someClass.handle)
      .nextHandler(someClass.handle)
      .handle({ errorMessage: 'error' });

    await expect(promise).rejects.toThrow(new Error('error'));
  });
});
