

"use client"

import * as React from "react"

import { Button } from "../button/page"
import { Input } from "../input/page"
import { Textarea } from "../textarea/page"


/* =====================================
   INPUT GROUP
===================================== */

function InputGroup({
  className = "",
  ...props
}) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={`input-group ${className}`}
      {...props}
    />
  )
}


/* =====================================
   INPUT GROUP ADDON
===================================== */

function InputGroupAddon({
  className = "",
  align = "inline-start",
  onClick,
  ...props
}) {

  const handleClick = (event) => {

    onClick?.(event)

    if (event.defaultPrevented) return

    if (event.target.closest("button")) return

    event.currentTarget.parentElement
      ?.querySelector("input, textarea")
      ?.focus()
  }

  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={`
        input-group-addon
        input-group-addon-${align}
        ${className}
      `}
      onClick={handleClick}
      {...props}
    />
  )
}


/* =====================================
   INPUT GROUP BUTTON
===================================== */

function InputGroupButton({
  className = "",
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}) {

  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={`
        input-group-button
        input-group-button-${size}
        ${className}
      `}
      {...props}
    />
  )
}


/* =====================================
   INPUT GROUP TEXT
===================================== */

function InputGroupText({
  className = "",
  ...props
}) {

  return (
    <span
      className={`input-group-text ${className}`}
      {...props}
    />
  )
}


/* =====================================
   INPUT GROUP INPUT
===================================== */

function InputGroupInput({
  className = "",
  ...props
}) {

  return (
    <Input
      data-slot="input-group-control"
      className={`input-group-input ${className}`}
      {...props}
    />
  )
}


/* =====================================
   INPUT GROUP TEXTAREA
===================================== */

function InputGroupTextarea({
  className = "",
  ...props
}) {

  return (
    <Textarea
      data-slot="input-group-control"
      className={`input-group-textarea ${className}`}
      {...props}
    />
  )
}


/* =====================================
   EXPORTS
===================================== */

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
