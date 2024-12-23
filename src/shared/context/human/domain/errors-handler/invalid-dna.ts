export class InvalidDNASequenceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidDNASequenceError';
  }
}
