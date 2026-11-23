
import { cn } from "cn";

function Input({
    className,
    type = "text",
    size = "default",
    invalid = false,
    startIcon,
    endIcon,
    ...props
}) {
    return (
        <div
            data-slot="input-wrapper"
            data-size={size}
            data-invalid={invalid}
            className="input-wrapper"
        >
            {startIcon && (
                <span className="input-icon input-icon-start">
                    {startIcon}
                </span>
            )}

            <input
                type={type}
                data-slot="input"
                aria-invalid={invalid || undefined}
                className={cn("input", className)}
                {...props}
            />

            {endIcon && (
                <span className="input-icon input-icon-end">
                    {endIcon}
                </span>
            )}
        </div>
    );
}

export { Input };
