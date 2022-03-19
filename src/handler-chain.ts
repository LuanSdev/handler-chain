export class HandlerChain<T> {
  public readonly chain: Function[];
  private data: T;

  constructor(data: T) {
    this.chain = [];
    this.data = data;
  }

  nextHandler(method: Function) {
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
