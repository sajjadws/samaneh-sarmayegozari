import { cn } from "cn"
import { Loader2Icon } from "lucide-react";

export function LoaderPublic({ className, ...props }) {
  return (
      <Loader2Icon
        className={cn("load-icon", className)}
        {...props}
      />
  )
}
