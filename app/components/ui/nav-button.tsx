import Button from '@mui/material/Button';
import { NavLink } from 'react-router';

interface NavButtonProps {
  text: string;
  url: string;
  style?: React.CSSProperties; // Allow passing custom styles
}

export function NavButton({ text, url, style }: NavButtonProps) {
  return (
    <nav>
      <NavLink to={url} end>
        <Button variant="contained" style={style}>
          {text}
        </Button>
      </NavLink>
    </nav>
  );
}
