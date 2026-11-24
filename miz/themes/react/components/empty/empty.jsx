
function Empty({ className, ...props }) {
  return (
    <div
      className={utils.cn("empty", className)}
      {...props}
    />
  );
}

function EmptyHeader({ className, ...props }) {
  return (
    <div
      className={utils.cn("empty-header", className)}
      {...props}
    />
  );
}

function EmptyMedia({
  className,
  variant = "default",
  ...props
}) {
  return (
    <div
      className={utils.cn(
        "empty-media",
        `empty-media-${variant}`,
        className
      )}
      {...props}
    />
  );
}

function EmptyTitle({ className, ...props }) {
  return (
    <h3
      className={utils.cn("empty-title", className)}
      {...props}
    />
  );
}

function EmptyDescription({ className, ...props }) {
  return (
    <p
      className={utils.cn("empty-description", className)}
      {...props}
    />
  );
}

function EmptyContent({ className, ...props }) {
  return (
    <div
      className={utils.cn("empty-content", className)}
      {...props}
    />
  );
}

export {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
};
