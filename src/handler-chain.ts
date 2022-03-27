export class HandlerChain {
  public readonly chain: Function[];
  protected data: any;
  public atLastOneSuccess: boolean;

  constructor() {
    this.chain = [];
    this.atLastOneSuccess = false;
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
    } catch {
      return;
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
