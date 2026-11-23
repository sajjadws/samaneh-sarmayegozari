
"use client"

import * as React from "react"
import { cn } from "cn"

function Label({ className, ...props }) {
  return (
    <label
      data-slot="label"
      className={cn("form-label", className)}
      {...props}
    />
  )
}

export { Label }
