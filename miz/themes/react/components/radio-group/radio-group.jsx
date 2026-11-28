
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";

function RadioGroup({
  orientation = "vertical",
  className,
  ...props
}) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      data-orientation={orientation}
      className={utils.cn("radio-group", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  value,
  id,
  size = "default",
  className,
  children,
  ...props
}) {
  return (
    <label
      data-slot="radio-group-item-wrapper"
      data-size={size}
      className={utils.cn("radio-group-item", className)}
    >
      <RadioPrimitive.Root
        data-slot="radio-group-item"
        id={id}
        value={value}
        className="radio-group-control"
        {...props}
      >
        <RadioPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="radio-group-indicator"
        />
      </RadioPrimitive.Root>

      {children && (
        <span className="radio-group-item-content">
          {children}
        </span>
      )}
    </label>
  );
}

export {
  RadioGroup,
  RadioGroupItem,
};
