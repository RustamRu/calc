import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from './index';


const buttonText = "buttonText";

const handleClick = jest.fn();

const renderComponent = () => render(
  <Button
    onClick={handleClick}
  >
    buttonText
  </Button>
);

describe('Компонент Button', () => {
  it('должен отрисовать текст кнопки', () => {
    renderComponent();
    const button = screen.getByRole('button', { name: buttonText });
    expect(button).toBeVisible();
  });

  it('должен вызвать колбэк, назначенный на onClick, при нажатии', () => {
    renderComponent();
    const button = screen.getByRole('button', { name: buttonText });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});