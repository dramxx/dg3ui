// TODO explore how to solve defaultProps for components
export interface IconProps {
  height?: string;
  width?: string;
  color?: string;
  disabled?: boolean;
  mark?: boolean;
  active?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
}
