import Button from "@mui/material/Button";

interface DefaultButtonProps {
  text: string;
  handleClick: () => void;
}

export function DefaultButton({ text, handleClick }: DefaultButtonProps) {
  return (
    <Button onClick={handleClick} variant="contained">
      {text}
    </Button>
  );
}
