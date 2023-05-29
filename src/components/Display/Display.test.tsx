import { screen } from "@testing-library/react";
import { Display } from ".";
import { renderWithProviders } from "../../utils";
import { INITIAL_OUTPUT_VALUE } from "../../data/var";


describe('Синхронизация с хранилищем', () => {
  it('должен отобразиться операнд №1', () => {
    const testedValue = "1";
    renderWithProviders(<Display />, {
      preloadedState: {
        calculation: {
          displayMode: 'operand1Input',
          operand1: testedValue,
          operand2: "0",
          operation: null,
          result: "0",
        }
      }
    });
    const display = screen.getByTestId('display');
    expect(display.textContent).toBe(testedValue);
  });
  it('должен отобразиться операнд №2', () => {
    const testedValue = "2";
    renderWithProviders(<Display />, {
      preloadedState: {
        calculation: {
          displayMode: 'operand2Input',
          operand1: "0",
          operand2: testedValue,
          operation: null,
          result: "0",
        }
      }
    });
    const display = screen.getByTestId('display');
    expect(display.textContent).toBe(testedValue);
  });
  it('должен отобразиться результат вычисления', () => {
    const testedValue = "3";
    renderWithProviders(<Display />, {
      preloadedState: {
        calculation: {
          displayMode: 'resultOutput',
          operand1: "0",
          operand2: "0",
          operation: null,
          result: testedValue,
        }
      }
    });
    const display = screen.getByTestId('display');
    expect(display.textContent).toBe(testedValue);
  });
})

describe('Отображение данных в правильном формате', () => {
  it('должно отобразиться начальное значение', () => {
    renderWithProviders(<Display />);
    const display = screen.getByTestId('display');
    expect(display).toBeVisible();
    expect(display.textContent).toBe(INITIAL_OUTPUT_VALUE);
  });
  it('должно отобразиться дробное число с запятой', () => {
    const testedValue = "12345.6789";
    renderWithProviders(<Display />, {
      preloadedState: {
        calculation: {
          displayMode: 'operand1Input',
          operand1: testedValue,
          operand2: "0",
          operation: null,
          result: "0",
        }
      }
    });
    const display = screen.getByTestId('display');
    expect(display.textContent).toBe("12345,6789");
  });
  it('должно отобразиться число из 10 цифр в десятичной нотации', () => {
    const testedValue = "1234567890";
    renderWithProviders(<Display />, {
      preloadedState: {
        calculation: {
          displayMode: 'operand1Input',
          operand1: testedValue,
          operand2: "0",
          operation: null,
          result: "0",
        }
      }
    });
    const display = screen.getByTestId('display');
    expect(display.textContent).toBe(testedValue);
  });
  it('должно отобразиться число (более чем из 10 цифр) в научной нотации не более чем из 10 символов в длину', () => {
    const testedValue = "12345678901";
    renderWithProviders(<Display />, {
      preloadedState: {
        calculation: {
          displayMode: 'operand1Input',
          operand1: testedValue,
          operand2: "0",
          operation: null,
          result: "0",
        }
      }
    });
    const display = screen.getByTestId('display');
    expect(display.textContent).toBe("1,2346e+10");
  });
  it('должно отобразиться сообщение при превышении допустимого положительного числа', () => {
    const testedValue = String(Number.MAX_SAFE_INTEGER + 1);
    renderWithProviders(<Display />, {
      preloadedState: {
        calculation: {
          displayMode: 'operand1Input',
          operand1: testedValue,
          operand2: "0",
          operation: null,
          result: "0",
        }
      }
    });
    const display = screen.getByTestId('display');
    expect(display.textContent).toBe("Превышен диапазон");
  });
  it('должно отобразиться сообщение при превышении допустимого отрицательного числа', () => {
    const testedValue = String(Number.MIN_SAFE_INTEGER - 1);
    renderWithProviders(<Display />, {
      preloadedState: {
        calculation: {
          displayMode: 'operand1Input',
          operand1: testedValue,
          operand2: "0",
          operation: null,
          result: "0",
        }
      }
    });
    const display = screen.getByTestId('display');
    expect(display.textContent).toBe(String("Превышен диапазон"));
  });
  it('должно отобразиться сообщение при неопределенном результате вычисления: деление на нуль', () => {
    const testedValue = String(-1 / 0);
    renderWithProviders(<Display />, {
      preloadedState: {
        calculation: {
          displayMode: 'operand1Input',
          operand1: testedValue,
          operand2: "0",
          operation: null,
          result: "0",
        }
      }
    });
    const display = screen.getByTestId('display');
    expect(display.textContent).toBe("Результат не определен");
  });
  it('должно отобразиться сообщение при неопределенном результате вычисления: корень из отрицательного числа', () => {
    const testedValue = String(Math.sqrt(-1));
    renderWithProviders(<Display />, {
      preloadedState: {
        calculation: {
          displayMode: 'operand1Input',
          operand1: testedValue,
          operand2: "0",
          operation: null,
          result: "0",
        }
      }
    });
    const display = screen.getByTestId('display');
    expect(display.textContent).toBe("Результат не определен");
  });
});