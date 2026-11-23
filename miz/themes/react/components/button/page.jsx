import { Button as ButtonPrimitive } from "@base-ui/react/button";

function Button({ className, variant = "default", size = "default", render, ...props }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={utils.cn("btn", variant !== "none" && `btn-${variant}`, size !== "none" && `btn-size-${size}`, className)}
      {...props}
    />
  );
}

export { Button };