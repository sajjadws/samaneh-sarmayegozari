import { Menu as MenuPrimitive } from "@base-ui/react/menu";

function DropdownMenu(props) {
  return <MenuPrimitive.Root {...props} />;
}

function DropdownMenuPortal(props) {
  return <MenuPrimitive.Portal {...props} />;
}

function DropdownMenuTrigger(props) {
  return <MenuPrimitive.Trigger {...props} />;
}

function DropdownMenuContent({
  className,
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="dropdown-menu-positioner"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup className={utils.cn("dropdown-menu-content", className)} {...props} />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuGroup(props) {
  return <MenuPrimitive.Group {...props} />;
}

function DropdownMenuLabel({ className, inset = false, ...props }) {
  return (
    <MenuPrimitive.GroupLabel
      className={utils.cn("dropdown-menu-label", inset && "dropdown-menu-inset", className)}
      {...props}
    />
  );
}

function DropdownMenuItem({ className, inset = false, variant = "default", ...props }) {
  return (
    <MenuPrimitive.Item
      className={utils.cn(
        "dropdown-menu-item",
        inset && "dropdown-menu-inset",
        variant === "destructive" && "dropdown-menu-item-destructive",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({ className, children, inset = false, ...props }) {
  return (
    <MenuPrimitive.CheckboxItem
      className={utils.cn("dropdown-menu-checkbox-item", inset && "dropdown-menu-inset", className)}
      {...props}
    >
      <span className="dropdown-menu-item-indicator">
        <MenuPrimitive.CheckboxItemIndicator>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m3 8 3.2 3.2L13 4.5" />
          </svg>
        </MenuPrimitive.CheckboxItemIndicator>
      </span>

      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup(props) {
  return <MenuPrimitive.RadioGroup {...props} />;
}

function DropdownMenuRadioItem({ className, children, inset = false, ...props }) {
  return (
    <MenuPrimitive.RadioItem
      className={utils.cn("dropdown-menu-radio-item", inset && "dropdown-menu-inset", className)}
      {...props}
    >
      <span className="dropdown-menu-item-indicator">
        <MenuPrimitive.RadioItemIndicator>
          <span className="dropdown-menu-radio-indicator" />
        </MenuPrimitive.RadioItemIndicator>
      </span>

      {children}
    </MenuPrimitive.RadioItem>
  );
}

function DropdownMenuSeparator({ className, ...props }) {
  return <MenuPrimitive.Separator className={utils.cn("dropdown-menu-separator", className)} {...props} />;
}

function DropdownMenuShortcut({ className, ...props }) {
  return <span className={utils.cn("dropdown-menu-shortcut", className)} {...props} />;
}

function DropdownMenuSub(props) {
  return <MenuPrimitive.SubmenuRoot {...props} />;
}

function DropdownMenuSubTrigger({ className, side = "right", inset = false, children, ...props }) {
  return (
    <MenuPrimitive.SubmenuTrigger
      className={utils.cn("dropdown-menu-sub-trigger", inset && "dropdown-menu-inset", className)}
      {...props}
    >
      {children}

      {side === "right" && (<svg
        className="dropdown-menu-sub-icon"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m6 3 5 5-5 5" />
      </svg>)}
      {side === "left" && (<svg
  className="dropdown-menu-sub-icon"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.8"
  strokeLinecap="round"
  strokeLinejoin="round"
  aria-hidden="true"
  viewBox="0 0 16 16"
>
  <path d="m10 3-5 5 5 5" />
</svg>)}
    </MenuPrimitive.SubmenuTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  ...props
}) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="dropdown-menu-positioner"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          className={utils.cn("dropdown-menu-content dropdown-menu-sub-content", className)}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
