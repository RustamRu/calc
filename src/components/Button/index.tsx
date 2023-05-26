import { FC } from "react";
import { Button as AntButton } from "antd";

interface IProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const Button: FC<IProps> = ({ children, onClick }) => {
  return (
    <AntButton onClick={onClick}>{children}</AntButton>
  )
}
