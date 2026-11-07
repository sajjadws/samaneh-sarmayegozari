// import { cva } from "class-variance-authority"
// import { cn } from "cn"

// function Empty({ className, ...props }) {
//   return (
//     <div
//       data-slot="empty"
//       className={cn(
//         "cn-empty flex w-full min-w-0 flex-1 flex-col items-center justify-center text-center text-balance",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function EmptyHeader({ className, ...props }) {
//   return (
//     <div
//       data-slot="empty-header"
//       className={cn(
//         "cn-empty-header flex max-w-sm flex-col items-center",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// const emptyMediaVariants = cva(
//   "cn-empty-media flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
//   {
//     variants: {
//       variant: {
//         default: "cn-empty-media-default",
//         icon: "cn-empty-media-icon",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   }
// )

// function EmptyMedia({
//   className,
//   variant = "default",
//   ...props
// }) {
//   return (
//     <div
//       data-slot="empty-icon"
//       data-variant={variant}
//       className={cn(emptyMediaVariants({ variant, className }))}
//       {...props}
//     />
//   )
// }

// function EmptyTitle({ className, ...props }) {
//   return (
//     <div
//       data-slot="empty-title"
//       className={cn("cn-empty-title cn-font-heading", className)}
//       {...props}
//     />
//   )
// }

// function EmptyDescription({ className, ...props }) {
//   return (
//     <div
//       data-slot="empty-description"
//       className={cn(
//         "cn-empty-description text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// function EmptyContent({ className, ...props }) {
//   return (
//     <div
//       data-slot="empty-content"
//       className={cn(
//         "cn-empty-content flex w-full max-w-sm min-w-0 flex-col items-center text-balance",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// export {
//   Empty,
//   EmptyHeader,
//   EmptyTitle,
//   EmptyDescription,
//   EmptyContent,
//   EmptyMedia,
// }


import { cva } from "class-variance-authority"
import { cn } from "cn"

function Empty({ className, ...props }) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "empty-container",
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        "empty-header",
        className
      )}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "empty-media",
  {
    variants: {
      variant: {
        default: "empty-media-default",
        icon: "empty-media-icon",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function EmptyMedia({
  className,
  variant = "default",
  ...props
}) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }) {
  return (
    <div
      data-slot="empty-title"
      className={cn("empty-title", className)}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "empty-description",
        className
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "empty-content",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}
