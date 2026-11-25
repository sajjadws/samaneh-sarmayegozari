"use client";

import { Button } from "../button/page";

export default function SubmitButton({ title, disabled, from, type = "submit", ...props }) {
  return (
    <Button {...props} type={type} disabled={disabled} from={from}>
      <span>{title}</span>
    </Button>
  );
}
