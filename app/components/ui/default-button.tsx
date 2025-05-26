import Button from '@mui/material/Button';

interface DefaultButtonProps {
  text: string;
  handleClick: () => void;
  style?: React.CSSProperties; // Allow passing custom styles
}

export function DefaultButton({
  text,
  handleClick,
  style,
}: DefaultButtonProps) {
  return (
    <Button onClick={handleClick} variant="contained" style={style}>
      {text}
    </Button>
  );
}
