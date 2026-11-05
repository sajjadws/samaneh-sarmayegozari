
"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"

import { Button } from "../button/page"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../input-group/page"
import { IconPlaceholder } from "@tabler/icons-react"


const Combobox = ComboboxPrimitive.Root

function ComboboxValue(props) {
  return (
    <ComboboxPrimitive.Value
      data-slot="combobox-value"
      {...props}
    />
  )
}

function ComboboxTrigger({
  className,
  children,
  ...props
}) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={`combobox-trigger ${className || ""}`}
      {...props}
    >
      {children}

      <IconPlaceholder
        lucide="ChevronDownIcon"
        tabler="IconChevronDown"
        hugeicons="ArrowDown01Icon"
        phosphor="CaretDownIcon"
        remixicon="RiArrowDownSLine"
        className="combobox-trigger-icon"
      />

    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxClear({
  className,
  ...props
}) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={`combobox-clear ${className || ""}`}
      {...props}
    >
      <IconPlaceholder
        lucide="XIcon"
        tabler="IconX"
        hugeicons="Cancel01Icon"
        phosphor="XIcon"
        remixicon="RiCloseLine"
        className="combobox-clear-icon"
      />
    </ComboboxPrimitive.Clear>
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}) {
  return (
    <InputGroup className={`combobox-input ${className || ""}`}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />

      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            render={<ComboboxTrigger />}
            data-slot="input-group-button"
            disabled={disabled}
          />
        )}

        {showClear && (
          <ComboboxClear disabled={disabled} />
        )}
      </InputGroupAddon>

      {children}
    </InputGroup>
  )
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="combobox-positioner"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={`combobox-content ${className || ""}`}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({
  className,
  ...props
}) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={`combobox-list ${className || ""}`}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={`combobox-item ${className || ""}`}
      {...props}
    >
      {children}

      <ComboboxPrimitive.ItemIndicator
        render={<span className="combobox-item-indicator" />}
      >
        <IconPlaceholder
          lucide="CheckIcon"
          tabler="IconCheck"
          hugeicons="Tick02Icon"
          phosphor="CheckIcon"
          remixicon="RiCheckLine"
          className="combobox-item-indicator-icon"
        />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({
  className,
  ...props
}) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={`combobox-group ${className || ""}`}
      {...props}
    />
  )
}

function ComboboxLabel({
  className,
  ...props
}) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={`combobox-label ${className || ""}`}
      {...props}
    />
  )
}

function ComboboxCollection(props) {
  return (
    <ComboboxPrimitive.Collection
      data-slot="combobox-collection"
      {...props}
    />
  )
}

function ComboboxEmpty({
  className,
  ...props
}) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={`combobox-empty ${className || ""}`}
      {...props}
    />
  )
}

function ComboboxSeparator({
  className,
  ...props
}) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={`combobox-separator ${className || ""}`}
      {...props}
    />
  )
}

function ComboboxChips({
  className,
  ...props
}) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={`combobox-chips ${className || ""}`}
      {...props}
    />
  )
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={`combobox-chip ${className || ""}`}
      {...props}
    >
      {children}

      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" size="icon-xs" />}
          className="combobox-chip-remove"
          data-slot="combobox-chip-remove"
        >
          <IconPlaceholder
            lucide="XIcon"
            tabler="IconX"
            hugeicons="Cancel01Icon"
            phosphor="XIcon"
            remixicon="RiCloseLine"
            className="combobox-clear-icon"
          />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({
  className,
  ...props
}) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={`combobox-chip-input ${className || ""}`}
      {...props}
    />
  )
}

function useComboboxAnchor() {
  return React.useRef(null)
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}
