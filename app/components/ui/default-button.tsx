import Button from '@mui/material/Button';
import type { ButtonHTMLAttributes } from 'react';

interface DefaultButtonProps {
  text: string;
  handleClick: () => void;
  style?: React.CSSProperties;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  fullWidth?: boolean;
}

export function DefaultButton({
  text,
  handleClick,
  style,
  type,
  disabled,
  size = 'medium',
  fullWidth = false,
}: DefaultButtonProps) {
  const getXlButtonStyle = () => {
    if (size !== 'xlarge') return {};

    return {
      padding: '16px 32px',
      fontSize: '2rem',
      fontWeight: '700',
      borderRadius: '20px',
    };
  };

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      size={size === 'xlarge' ? 'large' : size}
      fullWidth={fullWidth}
      style={{
        ...getXlButtonStyle(),
        ...style,
      }}
      type={type}
      disabled={disabled}
      sx={{
        '&.MuiButton-root': {
          textTransform: 'none', // Prevents all-caps text
        },
      }}
    >
      {text}
    </Button>
  );
}
