function Badge({ as: Component = "span", variant = "default", className, children, ...props }) {
  return (
    <Component data-slot="badge" className={utils.cn("badge", variant !== "none" && `badge-${variant}`, className)} {...props}>
      {children}
    </Component>
  );
}

export { Badge };
