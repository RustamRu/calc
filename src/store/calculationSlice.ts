import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { Digit } from '../types';
import { IOutputState, Operation } from '../types/calculation';


const initialState: IOutputState = {
  displayMode: 'operand1Input',
  operand1: 0,
  operand2: 0,
  operation: null,
  result: 0,
}

export const calculationSlice = createSlice({
  name: 'calculation',
  initialState,
  reducers: {
  },
})

export const { } = calculationSlice.actions;

export const selectMode = (state: RootState) => state.calculation.displayMode;
export const selectOperand1 = (state: RootState) => state.calculation.operand1;
export const selectOperand2 = (state: RootState) => state.calculation.operand2;
export const selectOperation = (state: RootState) => state.calculation.operation;
export const selectResult = (state: RootState) => state.calculation.result;

export default calculationSlice.reducer;