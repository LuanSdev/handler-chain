export class HandlerChain<T> {
  public readonly chain: Function[];
  private data: T;
  public atLastOneSuccess: boolean;

  constructor(data: T) {
    this.chain = [];
    this.atLastOneSuccess = false;
    this.data = data;
  }

  nextHandler(method: Function) {
    this.chain.push(method);

    return this;
  }

  async handle({ errorMessage }) {
    try {
      const nextHandler = this.chain.shift();
      await nextHandler(this.data);

      this.atLastOneSuccess = true;
    } finally {
      if (this.chain.length > 0) {
        await this.handle({ errorMessage });

        return;
      }

      if (!this.atLastOneSuccess) {
        throw new Error(errorMessage);
      }
    }
  }
}
