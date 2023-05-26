export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Mode = 'operand1Input' | 'operand2Input' | 'resultOutput';

export type Operation = '+';

export interface IOutputState {
  displayMode: Mode,
  operand1: number,
  operand2: number,
  operation: Operation | null;
  result: number,
}