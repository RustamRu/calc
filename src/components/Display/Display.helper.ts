import { SIMPLE_MODE } from "../../data/var";
import { Mode } from "../../types/calculation";


export const getOutput = (displayMode: Mode, operand1: number, operand2: number, result: number) => {
  switch (displayMode) {
    case 'operand1Input':
      return operand1;
    case 'operand2Input':
      return operand2;
    case 'resultOutput':
      return result;
  }
};

function replaceDecimalSeparator(value: string): string {
  return value.replace(".", ",");
};

export const formatOutput = (output: number): string => {
  if (output === +Infinity || output === -Infinity || Number.isNaN(output)) {
    return "Результат не определен";
  }

  if (output > Number.MAX_SAFE_INTEGER || output < Number.MIN_SAFE_INTEGER) {
    return "Превышен диапазон";
  }

  let stringOutput = String(output);
  if (stringOutput.length > SIMPLE_MODE.OUTPUT_LIMIT) {
    const specialSymbolsAmount = 6;
    stringOutput = String(output.toExponential(SIMPLE_MODE.OUTPUT_LIMIT - specialSymbolsAmount));
  }
  return replaceDecimalSeparator(stringOutput);
}