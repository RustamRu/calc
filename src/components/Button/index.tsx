import { FC } from "react";
import { Button as AntButton } from "antd";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

export const Button: FC<Props> = ({ children, onClick }) => {
  return (
    <AntButton onClick={onClick}>{children}</AntButton>
  )
}
