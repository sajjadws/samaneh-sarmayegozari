import { cn } from "cn"
import { Loader2Icon } from "lucide-react"

export default function PageLoader({ className, ...props }) {
  return (
    <div class="loader-wrapper">
      <Loader2Icon
        size={45}
        role="status"
        aria-label="Loading"
        className={cn("loader-icon", className)}
        {...props}
      />
      <p className="txt-size-normal">
          در حال بارگذاری...
      </p>
    </div>
  )
}
