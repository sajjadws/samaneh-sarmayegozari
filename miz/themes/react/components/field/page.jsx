import { useMemo } from "react";

function FieldSet({ className, ...props }) {
  return <fieldset className={utils.cn("field-set", className)} {...props} />;
}

function FieldLegend({ className, variant = "legend", ...props }) {
  return <legend className={utils.cn("field-legend", `field-legend-${variant}`, className)} {...props} />;
}

function FieldGroup({ className, ...props }) {
  return <div className={utils.cn("field-group", className)} {...props} />;
}

function Field({ className, orientation = "vertical", ...props }) {
  return (
    <div
      role="group"
      data-orientation={orientation}
      className={utils.cn("field", `field-${orientation}`, className)}
      {...props}
    />
  );
}

function FieldContent({ className, ...props }) {
  return <div className={utils.cn("field-content", className)} {...props} />;
}

function FieldLabel({ className, ...props }) {
  return <label className={utils.cn("field-label", className)} {...props} />;
}

function FieldTitle({ className, ...props }) {
  return <div className={utils.cn("field-title", className)} {...props} />;
}

function FieldDescription({ className, ...props }) {
  return <p className={utils.cn("field-description", className)} {...props} />;
}

function FieldSeparator({ children, className, ...props }) {
  return (
    <div role="separator" className={utils.cn("field-separator", className)} {...props}>
      {children && <span className="field-separator-content">{children}</span>}
    </div>
  );
}

function FieldError({ className, children, errors, ...props }) {
  const content = useMemo(() => {
    if (children) return children;
    if (!errors?.length) return null;

    const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()];

    if (uniqueErrors.length === 1) {
      return uniqueErrors[0]?.message;
    }

    return <ul>{uniqueErrors.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}</ul>;
  }, [children, errors]);

  if (!content) return null;

  return (
    <div role="alert" className={utils.cn("field-error", className)} {...props}>
      {content}
    </div>
  );
}

export {
  Field,
  FieldSet,
  FieldLegend,
  FieldGroup,
  FieldContent,
  FieldLabel,
  FieldTitle,
  FieldDescription,
  FieldSeparator,
  FieldError,
};
