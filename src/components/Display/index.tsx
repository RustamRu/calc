import { useSelector } from "react-redux";
import { selectMode, selectOperand1, selectOperand2, selectResult } from "../../store/calculationSlice";
import { formatOutput, getOutput } from "./Display.helper";


export const Display = () => {
  const displayMode = useSelector(selectMode);
  const operand1 = useSelector(selectOperand1);
  const operand2 = useSelector(selectOperand2);
  const result = useSelector(selectResult);

  const output = getOutput(displayMode, operand1, operand2, result);

  return (
    <div data-testid="display">
      {formatOutput(output)}
    </div>
  )
};