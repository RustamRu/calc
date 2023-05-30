export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export type InputChar = Digit | ',' | '+/-';

export type Operand = string;

export type CalculationResult = string;

export type Output = Operand | CalculationResult;

export type Mode = 'operand1Input' | 'operand2Input' | 'resultOutput';

export type Operation = '+' | '-' | '*' | '/' | '%' | '(' | ')';

export interface IOutputState {
  displayMode: Mode,
  operand1: Operand,
  operand2: Operand,
  operation: Operation | null;
  result: CalculationResult,
}