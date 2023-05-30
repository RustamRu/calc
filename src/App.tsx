import { FC } from 'react';
import { DigitButton, Display, OperationButton } from './components';


export const App: FC = () => {

  return (
    <div>
      <Display />

      <DigitButton digit='0' />
      <DigitButton digit='1' />
      <DigitButton digit='2' />
      <DigitButton digit='3' />
      <DigitButton digit='4' />
      <DigitButton digit='5' />
      <DigitButton digit='6' />
      <DigitButton digit='7' />
      <DigitButton digit='8' />
      <DigitButton digit='9' />

      <OperationButton operation='+'>+</OperationButton>
      <OperationButton operation='-'>-</OperationButton>
      <OperationButton operation='*'>*</OperationButton>
      <OperationButton operation='/'>/</OperationButton>

    </div>
  );
};