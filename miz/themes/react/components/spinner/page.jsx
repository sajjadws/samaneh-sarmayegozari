import { cn } from "cn"

import { IconPlaceholder } from "@tabler/icons-react"

function Spinner({ className, ...props }) {
  return (

    <IconPlaceholder  lucide="Loader2Icon"
      tabler="IconLoader"
      hugeicons="Loading03Icon"
      phosphor="SpinnerIcon"
      remixicon="RiLoaderLine"
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("spinner", className)}
      {...props}
    />


  )
}

export { Spinner }