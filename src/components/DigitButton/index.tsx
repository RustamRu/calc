import { FC } from "react"
import { Digit } from "../../types"
import { Button } from "../Button"
import { useDispatch } from "react-redux"
import { input } from "../../store/calculationSlice"


interface IProps {
  digit: Digit;
};

export const DigitButton: FC<IProps> = ({ digit }) => {
  const dispatch = useDispatch();

  return <Button onClick={() => dispatch(input(digit))}>{digit}</Button>
}
