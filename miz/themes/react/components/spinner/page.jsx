import { LoaderCircle } from "lucide-react";

function Spinner({ className, size = "default", label = "Loading", icon, ...props }) {
  return (
    <span data-slot="spinner" data-size={size} className={utils.cn("spinner", className)} role="status" {...props}>
      {icon || <LoaderCircle aria-hidden="true" />}

      <span className="spinner-sr-only">{label}</span>
    </span>
  );
}

export { Spinner };
