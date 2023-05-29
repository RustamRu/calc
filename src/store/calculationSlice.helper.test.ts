import { INITIAL_OUTPUT_VALUE } from "../data/var";
import { InputChar, Output } from "../types/calculation";
import { addCharToOperandOutput } from "./calculationSlice.helper";


describe('Функция addCharToOperandOutput', () => {
  it('должна отобразиться только 1 запятая', () => {
    const input: InputChar[] = [',', ',', '0', ','];
    const output: Output = input.reduce((currentValue: Output, inputChar) => `${addCharToOperandOutput(inputChar, currentValue)}`, INITIAL_OUTPUT_VALUE);
    expect(output).toBe('0,0');
  });

  it('знак "-" должен показаться при любом значении (отличном от нуля)', () => {
    const input: InputChar[] = ['1', '+/-'];
    const output: Output = input.reduce((currentValue: Output, inputChar) => `${addCharToOperandOutput(inputChar, currentValue)}`, INITIAL_OUTPUT_VALUE);
    expect(output).toBe('-1');
  });

  it('знак "+" не должен показаться при любом значении', () => {
    const input: InputChar[] = ['1', '+/-', '+/-'];
    const output: Output = input.reduce((currentValue: Output, inputChar) => `${addCharToOperandOutput(inputChar, currentValue)}`, INITIAL_OUTPUT_VALUE);
    expect(output).toBe('1');
  });

  it('знак не должен показаться при нуле', () => {
    const input: InputChar[] = ['+/-'];
    const output: Output = input.reduce((currentValue: Output, inputChar) => `${addCharToOperandOutput(inputChar, currentValue)}`, INITIAL_OUTPUT_VALUE);
    expect(output).toBe('0');
  });

  it('нуль не должен добавляться при нуле', () => {
    const input: InputChar[] = ['0', '0'];
    const output: Output = input.reduce((currentValue: Output, inputChar) => `${addCharToOperandOutput(inputChar, currentValue)}`, INITIAL_OUTPUT_VALUE);
    expect(output).toBe('0');
  });

  it('нуль должен заменяться на введенную цифру, отличную от нуля', () => {
    const input: InputChar[] = ['0', '1'];
    const output: Output = input.reduce((currentValue: Output, inputChar) => `${addCharToOperandOutput(inputChar, currentValue)}`, INITIAL_OUTPUT_VALUE);
    expect(output).toBe('1');
  });
});