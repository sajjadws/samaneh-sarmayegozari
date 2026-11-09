import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "cn";

function Button({ className, variant = "default", size = "default",render, ...props }) {
	return <ButtonPrimitive data-slot="button" className={cn("btn", 
	`btn-${variant}`, `btn-${size}`, className)} render={render} {...props} />;
}

export { Button };
