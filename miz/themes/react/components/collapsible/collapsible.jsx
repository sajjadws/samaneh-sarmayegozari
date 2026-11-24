import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";

function Collapsible({ className, ...props }) {
  return (
    <CollapsiblePrimitive.Root data-slot="collapsible" className={utils.cn("collapsible", className)} {...props} />
  );
}

function CollapsibleTrigger({ className, ...props }) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={utils.cn("collapsible-trigger", className)}
      {...props}
    />
  );
}

function CollapsibleContent({ className, ...props }) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      className={utils.cn("collapsible-content", className)}
      {...props}
    />
  );
}

export { CollapsibleTrigger, CollapsibleContent, Collapsible };