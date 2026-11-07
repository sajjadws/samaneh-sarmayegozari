"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";


function Popover({ ...props }) {
  return (
    <PopoverPrimitive.Root
      data-slot="popover"
      {...props}
    />
  );
}


function PopoverTrigger({ ...props }) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      className={`popover-trigger ${props.className || ""}`}
      {...props}
    />
  );
}


function PopoverContent({
  className = "",
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 8,
  ...props
}) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="popover-positioner"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={`popover-content ${className}`}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}


function PopoverHeader({ className = "", ...props }) {
  return (
    <div
      data-slot="popover-header"
      className={`popover-header ${className}`}
      {...props}
    />
  );
}


function PopoverTitle({ className = "", ...props }) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={`popover-title ${className}`}
      {...props}
    />
  );
}


function PopoverDescription({ className = "", ...props }) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={`popover-description ${className}`}
      {...props}
    />
  );
}


export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
};