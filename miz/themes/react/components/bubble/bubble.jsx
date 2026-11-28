
import { useRender } from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react/merge-props";

function Bubble({
  variant = "default",
  align = "start",
  className,
  ...props
}) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={utils.cn("bubble", className)}
      {...props}
    />
  );
}

function BubbleContent({ render, className, ...props }) {
  const element = useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(
      {
        className: "bubble-content",
      },
      {
        ...props,
        className,
      }
    ),
  });

  return element;
}

function BubbleGroup({ className, ...props }) {
  return (
    <div
      data-slot="bubble-group"
      className={utils.cn("bubble-group", className)}
      {...props}
    />
  );
}

function BubbleReactions({
  side = "bottom",
  align = "start",
  className,
  ...props
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-side={side}
      data-align={align}
      className={utils.cn("bubble-reactions", className)}
      {...props}
    />
  );
}

export {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
};
