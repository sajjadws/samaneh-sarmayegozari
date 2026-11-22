"use client";

import { Button } from "../button/page";

const SubmitButton = ({title,disabled,from, type = "submit", ...props}) => {
  return(
    <Button {...props} type={type} disabled={disabled} from={from}>
      <span>{title}</span>
    </Button>
  )
}