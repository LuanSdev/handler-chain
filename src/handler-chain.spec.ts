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

    await sut.nextHandler(someClass.handle).handle();

    expect(someClass.data).toBe('valid-data');
  });

  it('Should push next handler to chain', async () => {
    const { sut } = makeSut('valid-data');
    const someClass = new SomeClass();

    sut.nextHandler(someClass.handle).nextHandler(someClass.handle);

    expect(sut.chain.length > 0).toBe(true);
  });
});
