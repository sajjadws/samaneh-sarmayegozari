import { Input } from "../input/page";
import { Button } from "../button/page";

function InputGroup({ className, ...props }) {
  return <div role="group" data-slot="input-group" className={utils.cn("input-group", className)} {...props} />;
}

function InputGroupAddon({ className, align = "inline-start", ...props }) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={utils.cn("input-group-addon", `input-group-addon-${align}`, className)}
      onClick={(event) => {
        if (event.target.closest("button")) return;

        const control = event.currentTarget.parentElement?.querySelector('[data-slot="input-group-control"]');

        control?.focus();
      }}
      {...props}
    />
  );
}

function InputGroupButton({ className, type = "button", variant = "ghost", size = "xs", ...props }) {
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      data-size={size}
      className={utils.cn("input-group-button", className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }) {
  return <span className={utils.cn("input-group-text", className)} {...props} />;
}

function InputGroupInput({ className, ...props }) {
  return <Input data-slot="input-group-control" className={utils.cn("input-group-input", className)} {...props} />;
}

function InputGroupTextarea({ className, ...props }) {
  return (
    <textarea data-slot="input-group-control" className={utils.cn("input-group-textarea", className)} {...props} />
  );
}

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupInput, InputGroupTextarea };
