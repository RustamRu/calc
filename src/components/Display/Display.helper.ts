import { SIMPLE_MODE } from "../../data/var";
import { CalculationResult, Mode, Operand, Output } from "../../types/calculation";


export const getOutput = (displayMode: Mode, operand1: Operand, operand2: Operand, result: CalculationResult): Output => {
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

export const formatOutput = (output: Output): Output => {
  const numberOutput = Number(output);

  if (numberOutput === +Infinity || numberOutput === -Infinity || Number.isNaN(numberOutput)) {
    return "Результат не определен";
  }

  if (numberOutput > Number.MAX_SAFE_INTEGER || numberOutput < Number.MIN_SAFE_INTEGER) {
    return "Превышен диапазон";
  }

  let stringOutput = String(numberOutput);
  if (stringOutput.length > SIMPLE_MODE.OUTPUT_LIMIT) {
    const specialSymbolsAmount = 6;
    stringOutput = String(numberOutput.toExponential(SIMPLE_MODE.OUTPUT_LIMIT - specialSymbolsAmount));
  }
  return replaceDecimalSeparator(stringOutput);
}