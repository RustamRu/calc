import { fireEvent, screen } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { renderWithProviders } from "../../utils";
import { OperationButton } from ".";
import { Operation } from "../../types/calculation";


const mockStore = configureMockStore();

describe('Компонент OperationButton', () => {
  it('должна отрисоваться кнопка с заданной надписью', () => {
    const caption = '+';
    renderWithProviders(<OperationButton operation={"+"}>{caption}</OperationButton>);
    const button = screen.getByRole('button', { name: caption });
    expect(button).toBeInTheDocument();
  });
  it('должны быть отправлен action при нажатии кнопки каждой операции', () => {
    const store = mockStore({
      calculation: {
        displayMode: 'operand1Input',
        operand1: "0",
        operand2: "0",
        operation: null,
        result: "0",
      }
    });

    const operationsData: { operation: Operation, caption: string }[] = [
      { operation: '+', caption: '+' },
      { operation: '-', caption: '-' },
      { operation: '*', caption: '*' },
      { operation: '/', caption: '/' },
    ];
    operationsData.forEach(({ operation, caption }) => {
      renderWithProviders(<OperationButton operation={operation}>{caption}</OperationButton>, { store })
      const button = screen.getByRole('button', { name: caption });
      expect(button).toBeInTheDocument();

      fireEvent.click(button);
      const actions = store.getActions();
      expect(actions).toEqual([{
        "payload": operation,
        type: "calculation/setOperation",
      }]);
      store.clearActions();
    });
  });
});