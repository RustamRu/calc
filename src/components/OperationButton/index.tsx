import { FC, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../Button";
import { setOperation } from "../../store/calculationSlice";
import { Operation } from "../../types/calculation";


interface IProps {
  operation: Operation;
  children: ReactNode;
};

export const OperationButton: FC<IProps> = ({ operation, children }) => {
  const dispatch = useDispatch();

  return <Button onClick={() => dispatch(setOperation(operation))}>{children}</Button>
}
