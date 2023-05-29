import { Action } from "@reduxjs/toolkit";
import configureMockStore from "redux-mock-store";
import calculationReducer, { initialState as calculationSliceInitialState, input } from './calculationSlice';
import { IOutputState, InputChar, Output } from "../types/calculation";


const mockStore = configureMockStore([]);
const createState = (initialState: IOutputState) => (actions: Action[]) => actions.reduce(calculationReducer, initialState);


describe('calculationSlice', () => {
  it('должен вернуть начальное значение', () => {
    expect(calculationReducer(undefined, { type: undefined })).toEqual(calculationSliceInitialState);
  })
});

describe('input reducer', () => {
  const testCases: { inputValue: InputChar, expectedValue: Output }[] = [
    { inputValue: "0", expectedValue: "0" },
    { inputValue: "1", expectedValue: "1" },
    { inputValue: "2", expectedValue: "12" },
    { inputValue: "3", expectedValue: "123" },
    { inputValue: "4", expectedValue: "1234" },
    { inputValue: "5", expectedValue: "12345" },
    { inputValue: ",", expectedValue: "12345," },
    { inputValue: "6", expectedValue: "12345,6" },
    { inputValue: "7", expectedValue: "12345,67" },
    { inputValue: "8", expectedValue: "12345,678" },
    { inputValue: "9", expectedValue: "12345,6789" },
    { inputValue: "+/-", expectedValue: "-12345,6789" },
    { inputValue: "0", expectedValue: "-12345,67890" },
  ];

  it('должен изменить только значение операнда №1 при вводе (-12345,67890)', () => {
    const initialMockState: IOutputState = {
      ...calculationSliceInitialState,
      displayMode: 'operand1Input',
      operand1: "0",
    };
    const store = mockStore(createState(initialMockState));
    let state: IOutputState;

    testCases.forEach(({ inputValue, expectedValue }) => {
      store.dispatch(input(inputValue));
      state = store.getState() as IOutputState;
      expect(state).toEqual({
        ...initialMockState,
        operand1: expectedValue
      });
    });
  });

  it('должен изменить только значение операнда №2 при вводе (-12345,67890)', () => {
    const initialMockState: IOutputState = {
      ...calculationSliceInitialState,
      displayMode: 'operand2Input',
      operand2: "0",
    };
    const store = mockStore(createState(initialMockState));
    let state: IOutputState;

    testCases.forEach(({ inputValue, expectedValue }) => {
      store.dispatch(input(inputValue));
      state = store.getState() as IOutputState;
      expect(state).toEqual({
        ...initialMockState,
        operand2: expectedValue
      });
    });
  });

  it('должен сменить режим ввода (результат -> операнд №1) и вернуть значение операнда №1 при вводе во время отображения результата последнего вычисления', () => {
    const initialMockState: IOutputState = {
      ...calculationSliceInitialState,
      displayMode: 'resultOutput',
      operand1: "0",
      result: '777',
    };
    const store = mockStore(createState(initialMockState));
    let state: IOutputState;

    store.dispatch(input(","));
    state = store.getState() as IOutputState;
    expect(state).toEqual({
      ...initialMockState,
      displayMode: 'operand1Input',
      operand1: "0,",
    });
  });
});