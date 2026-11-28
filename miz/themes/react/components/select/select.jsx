
import { Select as SelectPrimitive } from "@base-ui/react/select";
import {
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

function Select(props) {
  return <SelectPrimitive.Root {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={utils.cn("select-trigger", className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="select-icon">
        <ChevronDown />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectValue({ className, ...props }) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={utils.cn("select-value", className)}
      {...props}
    />
  );
}

function SelectContent({
  className,
  sideOffset = 4,
  alignItemWithTrigger = false,
  children,
  ...props
}) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        sideOffset={sideOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="select-positioner"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={utils.cn("select-content", className)}
          {...props}
        >
          <SelectPrimitive.ScrollUpArrow className="select-scroll-arrow">
            <ChevronUp />
          </SelectPrimitive.ScrollUpArrow>

          <SelectPrimitive.List className="select-list">
            {children}
          </SelectPrimitive.List>

          <SelectPrimitive.ScrollDownArrow className="select-scroll-arrow">
            <ChevronDown />
          </SelectPrimitive.ScrollDownArrow>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectGroup({ className, ...props }) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={utils.cn("select-group", className)}
      {...props}
    />
  );
}

function SelectLabel({ className, ...props }) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={utils.cn("select-label", className)}
      {...props}
    />
  );
}

function SelectItem({ className, children, ...props }) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={utils.cn("select-item", className)}
      {...props}
    >
      <SelectPrimitive.ItemText className="select-item-text">
        {children}
      </SelectPrimitive.ItemText>

      <SelectPrimitive.ItemIndicator className="select-item-indicator">
        <Check />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={utils.cn("select-separator", className)}
      {...props}
    />
  );
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};
