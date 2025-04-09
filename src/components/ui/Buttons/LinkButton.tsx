import { Button, ButtonProps } from "@mui/material";
import Link from "next/link";

export function LinkButton({
  href,
  text,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  ...props
}: {
  href: string;
  text: string;
} & ButtonProps) {
  return (
    <Link href={href} passHref style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Button variant={variant} color={color} size={size} {...props}>
        {text}
      </Button>
    </Link>
  );
}