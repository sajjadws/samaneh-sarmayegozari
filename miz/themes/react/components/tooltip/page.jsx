// "use client"

// import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
// import { cn } from "cn"

// function TooltipProvider({
//   delay = 0,
//   ...props
// }) {
//   return (
//     <TooltipPrimitive.Provider
//       data-slot="tooltip-provider"
//       delay={delay}
//       {...props}
//     />
//   )
// }

// function Tooltip({ ...props }) {
//   return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
// }

// function TooltipTrigger({ ...props }) {
//   return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
// }

// function TooltipContent({
//   className,
//   side = "top",
//   sideOffset = 4,
//   align = "center",
//   alignOffset = 0,
//   children,
//   ...props
// }) {
//   return (
//     <TooltipPrimitive.Portal>
//       <TooltipPrimitive.Positioner
//         align={align}
//         alignOffset={alignOffset}
//         side={side}
//         sideOffset={sideOffset}
//         className="isolate z-50"
//       >
//         <TooltipPrimitive.Popup
//           data-slot="tooltip-content"
//           className={cn(
//             "cn-tooltip-content cn-tooltip-content-logical z-50 w-fit max-w-xs origin-(--transform-origin) bg-foreground text-background",
//             className
//           )}
//           {...props}
//         >
//           {children}
//           <TooltipPrimitive.Arrow className="cn-tooltip-arrow cn-tooltip-arrow-logical z-50 bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" />
//         </TooltipPrimitive.Popup>
//       </TooltipPrimitive.Positioner>
//     </TooltipPrimitive.Portal>
//   )
// }

// export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { cn } from "cn"

function TooltipProvider({
  delay = 0,
  ...props
}) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({ ...props }) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({ ...props }) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="tooltip-positioner"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "tooltip-content",
            className
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className="tooltip-arrow" />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }