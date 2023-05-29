import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { IOutputState, InputChar } from '../types/calculation';
import { addCharToOperandOutput } from './calculationSlice.helper';


export const initialState: IOutputState = {
  displayMode: 'operand1Input',
  operand1: '0',
  operand2: '0',
  operation: null,
  result: '0',
}

export const calculationSlice = createSlice({
  name: 'calculation',
  initialState,
  reducers: {
    input: (state, { payload: char }: PayloadAction<InputChar>) => {
      switch (state.displayMode) {
        case 'resultOutput':
          state.displayMode = 'operand1Input';
          state.operand1 = addCharToOperandOutput(char, '0');
          break;
        case 'operand1Input':
          state.operand1 = addCharToOperandOutput(char, state.operand1);
          break;
        case 'operand2Input':
          state.operand2 = addCharToOperandOutput(char, state.operand2);
          break;
        default:
          break;
      }
    },
  },
})

export const { input } = calculationSlice.actions;

export const selectMode = (state: RootState) => state.calculation.displayMode;
export const selectOperand1 = (state: RootState) => state.calculation.operand1;
export const selectOperand2 = (state: RootState) => state.calculation.operand2;
export const selectOperation = (state: RootState) => state.calculation.operation;
export const selectResult = (state: RootState) => state.calculation.result;

export default calculationSlice.reducer;