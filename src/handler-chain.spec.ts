class HandlerChain {
  private chain: Function[];
  private data: any;

  constructor(data: any) {
    this.chain = [];
    this.data = data;
  }

  nextHandler(method) {
    this.chain.push(method);

    return this;
  }

  async handle() {
    const nextHandler = this.chain.shift();
    await nextHandler(this.data);

    if (this.chain.length > 0) {
      await this.handle();
    }
  }
}

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

    const pimba = new SomeClass();

    await sut.nextHandler(pimba.handle).handle();

    expect(pimba.data).toBe('valid-data');
  });
});
