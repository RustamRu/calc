import { InputChar, Operand } from "../types/calculation";


export const addCharToOperandOutput = (char: InputChar, currentValue: Operand) => {
  switch (char) {
    case ",":
      if (currentValue.includes(',')) {
        return currentValue;
      }
      return `${currentValue},`;
    case "+/-":
      if (Number(currentValue) === 0) {
        return '0';
      }
      if (currentValue.charAt(0) === '-') {
        return currentValue.slice(1);
      }
      return `-${currentValue}`;
    default: // digit
      if (Number(currentValue) === 0) {
        return char;
      }
      return `${currentValue}${char}`;
  }
};