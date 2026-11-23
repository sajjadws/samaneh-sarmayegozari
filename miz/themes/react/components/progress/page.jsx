"use client"

import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cn } from "cn"

function Progress({
  className,
  children,
  value,
  ...props
}) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn("progress-root", className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  )
}

function ProgressTrack({ className, ...props }) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "progress-track",
        className
      )}
      data-slot="progress-track"
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  ...props
}) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn("progress-indicator", className)}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }) {
  return (
    <ProgressPrimitive.Label
      className={cn("progress-label", className)}
      data-slot="progress-label"
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }) {
  return (
    <ProgressPrimitive.Value
      className={cn("progress-value", className)}
      data-slot="progress-value"
      {...props}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}


//---------------- استفاده دستی در صفحه----------------------//
{/* <Progress value={65}>
    <ProgressLabel>
    میزان پیشرفت
    </ProgressLabel>

    <ProgressValue />
</Progress> */}


//-----------------------استفاده داینامیک در صفحه ----------------------//
// "use client"

// import { useState } from "react"

// import {
//   Progress,
//   ProgressLabel,
//   ProgressValue,
// } from "@/components/ui/progress"

// export default function MyComponent() {
//   const [progress, setProgress] = useState(35)

//   return (
//     <div>
//       <Progress value={progress}>
//         <ProgressLabel>
//           میزان آپلود
//         </ProgressLabel>

//         <ProgressValue />
//       </Progress>

//       <button onClick={() => setProgress(75)}>
//         افزایش پیشرفت
//       </button>
//     </div>
//   )
// }