export class CodeGeneratorError extends Error {
    readonly detail?: unknown;
  
    constructor(message: string, detail?: unknown) {
      super(message);
      this.name = this.constructor.name;
      this.detail = detail;
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }