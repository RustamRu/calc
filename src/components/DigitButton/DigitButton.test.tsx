import { fireEvent, screen } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { DigitButton } from ".";
import { Digit } from "../../types";
import { renderWithProviders } from "../../utils";


const mockStore = configureMockStore();
const digits: Digit[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

describe('Компонент DigitButton', () => {
  it('должны быть отправлен action при нажатии кнопки каждой цифры', () => {
    const store = mockStore({
      calculation: {
        displayMode: 'operand1Input',
        operand1: "0",
        operand2: "0",
        operation: null,
        result: "0",
      }
    });

    digits.forEach((digit) => {
      renderWithProviders(<DigitButton digit={digit} />, { store })
      const button = screen.getByRole('button', { name: digit });
      expect(button).toBeInTheDocument();

      fireEvent.click(button);
      const actions = store.getActions();
      expect(actions).toEqual([{
        "payload": digit,
        type: "calculation/input",
      }]);
      store.clearActions();
    });
  });
});