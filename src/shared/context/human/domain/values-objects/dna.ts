import { InvalidDNASequenceError } from '../errors-handler/invalid-dna';

export class DnaValueObject {
  private readonly value: string;

  constructor(input: string) {
    this.value = input;
    this.validate(input);
  }

  private validate(input: string): void {
    const isValid = /^[atcg]+$/i.test(input);

    if (!isValid) {
      throw new InvalidDNASequenceError(
        "Invalid DNA sequence. The string must contain only the characters 'a', 't', 'c', or 'g'.",
      );
    }
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: DnaValueObject): boolean {
    return this.value.toLowerCase() === other.value.toLowerCase();
  }
}
