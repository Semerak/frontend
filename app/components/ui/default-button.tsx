import Button from '@mui/material/Button';
import type { ButtonHTMLAttributes } from 'react';

interface DefaultButtonProps {
  text: string;
  handleClick: () => void;
  style?: React.CSSProperties; // Allow passing custom styles
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
}

export function DefaultButton({
  text,
  handleClick,
  style,
  type,
  disabled,
}: DefaultButtonProps) {
  return (
    <Button
      onClick={handleClick}
      variant="contained"
      style={style}
      type={type}
      disabled={disabled}
    >
      {text}
    </Button>
  );
}
