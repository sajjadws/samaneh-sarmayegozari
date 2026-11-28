import { Input as InputPrimitive } from "@base-ui/react/input";

function Input({ className, type = "text", ...props }) {
  return <InputPrimitive type={type} className={utils.cn("input", className)} {...props} />;
}

export { Input };
