import { DnaValueObject } from './values-objects/dna';

export interface HumanPrimitive {
  id: string;
  is_mutant: boolean;
}

export interface HumanCreateProps extends Omit<HumanPrimitive, 'is_mutant'> {
  dna: string[];
}

export class Human {
  id: string;
  dna: string[];
  is_mutant: boolean;

  private constructor({ id, dna }: HumanCreateProps) {
    this.id = id;

    const dnaList = dna.map(value => new DnaValueObject(value.toLowerCase()).getValue());

    this.is_mutant = this.isMutant(dnaList);
    this.dna = dna;
  }

  public static create(human: HumanCreateProps) {
    return new Human(human);
  }

  public isMutant(dna: string[]): boolean {
    const matrixSize = dna.length;
    let mutationCount = 0;

    const checkLine = (row: number, col: number, rowIncrement: number, colIncrement: number) => {
      if (row < 0 || row >= matrixSize || col < 0 || col >= matrixSize) return 0;

      let matches = 1;
      for (let i = 1; i < 4; i++) {
        const newRow = row + i * rowIncrement;
        const newCol = col + i * colIncrement;

        if (
          newRow < 0 ||
          newRow >= matrixSize ||
          newCol < 0 ||
          newCol >= matrixSize ||
          dna[row][col] !== dna[newRow][newCol]
        )
          break;
        matches++;
      }
      return matches >= 4 ? 1 : 0;
    };

    for (let row = 0; row < matrixSize; row++) {
      for (let col = 0; col < matrixSize; col++) {
        mutationCount += checkLine(row, col, 0, 1); // Horizontal
        mutationCount += checkLine(row, col, 1, 0); // Vertical
        mutationCount += checkLine(row, col, 1, 1); // Diagonal \
        mutationCount += checkLine(row, col, 1, -1); // Diagonal /

        if (mutationCount > 1) return true;
      }
    }

    return false;
  }

  public toPrimitive(): HumanPrimitive {
    return { id: this.id, is_mutant: this.is_mutant };
  }
}
