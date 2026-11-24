// import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

// function Separator({ className, orientation = "horizontal", decorative = true, ...props }) {
//   return (
//     <SeparatorPrimitive
//       data-slot="separator"
//       orientation={orientation}
//       decorative={decorative}
//       className={utils.cn("separator", className)}
//       {...props}
//     />
//   );
// }

// export { Separator };





import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      aria-hidden={decorative ? true : undefined}
      role={decorative ? "none" : "separator"}
      className={utils.cn("separator", className)}
      {...props}
    />
  );
}

export { Separator };
