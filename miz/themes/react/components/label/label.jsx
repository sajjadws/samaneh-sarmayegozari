function Label({ className, ...props }) {
  return <label data-slot="label" className={utils.cn("label", className)} {...props} />;
}

export { Label };
