import { useRef } from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";

function Combobox({ className, ...props }) {
  return <ComboboxPrimitive.Root data-slot="combobox" className={utils.cn("combobox", className)} {...props} />;
}

function ComboboxValue({ className, ...props }) {
  return (
    <ComboboxPrimitive.Value data-slot="combobox-value" className={utils.cn("combobox-value", className)} {...props} />
  );
}

function ComboboxTrigger({ className, children, ...props }) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      aria-label={children ? undefined : "Open options"}
      className={utils.cn("combobox-trigger", className)}
      {...props}
    >
      {children}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxClear({ className, ...props }) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      aria-label="Clear selection"
      className={utils.cn("combobox-clear", className)}
      {...props}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </ComboboxPrimitive.Clear>
  );
}

function ComboboxInput({ className, disabled = false, showTrigger = true, showClear = false, ...props }) {
  return (
    <div className={utils.cn("combobox-input-wrapper", className)}>
      <ComboboxPrimitive.Input data-slot="combobox-input" className="combobox-input" disabled={disabled} {...props} />

      {showTrigger && <ComboboxTrigger disabled={disabled} />}

      {showClear && <ComboboxClear disabled={disabled} />}
    </div>
  );
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
          className={utils.cn("combobox-content", className)}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxList({ className, ...props }) {
  return (
    <ComboboxPrimitive.List data-slot="combobox-list" className={utils.cn("combobox-list", className)} {...props} />
  );
}

function ComboboxItem({ className, children, ...props }) {
  return (
    <ComboboxPrimitive.Item data-slot="combobox-item" className={utils.cn("combobox-item", className)} {...props}>
      {children}

      <ComboboxPrimitive.ItemIndicator render={<span className="combobox-item-indicator" />}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m5 12 4 4L19 6" />
        </svg>
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}

function ComboboxGroup({ className, ...props }) {
  return (
    <ComboboxPrimitive.Group data-slot="combobox-group" className={utils.cn("combobox-group", className)} {...props} />
  );
}

function ComboboxLabel({ className, ...props }) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={utils.cn("combobox-label", className)}
      {...props}
    />
  );
}

function ComboboxCollection(props) {
  return <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />;
}

function ComboboxEmpty({ className, ...props }) {
  return (
    <ComboboxPrimitive.Empty data-slot="combobox-empty" className={utils.cn("combobox-empty", className)} {...props} />
  );
}

function ComboboxSeparator({ className, ...props }) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={utils.cn("combobox-separator", className)}
      {...props}
    />
  );
}

function ComboboxChips({ className, ...props }) {
  return (
    <ComboboxPrimitive.Chips data-slot="combobox-chips" className={utils.cn("combobox-chips", className)} {...props} />
  );
}

function ComboboxChip({ className, children, showRemove = true, ...props }) {
  return (
    <ComboboxPrimitive.Chip data-slot="combobox-chip" className={utils.cn("combobox-chip", className)} {...props}>
      {children}

      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          aria-label={`Remove ${typeof children === "string" ? children : "item"}`}
          className="combobox-chip-remove"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  );
}

function ComboboxChipsInput({ className, ...props }) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chips-input"
      className={utils.cn("combobox-chips-input", className)}
      {...props}
    />
  );
}

function useComboboxAnchor() {
  return useRef(null);
}

export {
  Combobox,
  ComboboxValue,
  ComboboxTrigger,
  ComboboxClear,
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
  useComboboxAnchor,
};
