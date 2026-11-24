function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={utils.cn("textarea", className)}
      {...props}
    />
  );
}

export {
  Textarea,
};