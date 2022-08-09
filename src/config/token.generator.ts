import { Generator } from "types";

class TokenGenerator {
  initialize(generator: Generator) {
    this.get = generator;
  }

  get() {
    throw new Error("Token generator was not initialized");
  }
}

export default new TokenGenerator();
