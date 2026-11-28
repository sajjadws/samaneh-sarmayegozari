
import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

function Progress({
  className,
  size = "default",
  variant = "default",
  ...props
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      data-size={size}
      data-variant={variant}
      className={utils.cn("progress", className)}
      {...props}
    />
  );
}

function ProgressLabel({ className, ...props }) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      className={utils.cn("progress-label", className)}
      {...props}
    />
  );
}

function ProgressValue({ className, ...props }) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      className={utils.cn("progress-value", className)}
      {...props}
    />
  );
}

function ProgressTrack({ className, ...props }) {
  return (
    <ProgressPrimitive.Track
      data-slot="progress-track"
      className={utils.cn("progress-track", className)}
      {...props}
    />
  );
}

function ProgressIndicator({ className, ...props }) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={utils.cn("progress-indicator", className)}
      {...props}
    />
  );
}

export {
  Progress,
  ProgressLabel,
  ProgressValue,
  ProgressTrack,
  ProgressIndicator,
};
