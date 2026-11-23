
import { cn } from "cn";

function Field({ className, orientation = "vertical", ...props }) {
    return (
        <div
            data-slot="field"
            data-orientation={orientation}
            className={cn("field", className)}
            {...props}
        />
    );
}

function FieldSet({ className, ...props }) {
    return (
        <fieldset
            data-slot="field-set"
            className={cn("field-set", className)}
            {...props}
        />
    );
}

function FieldLegend({ className, variant = "legend", ...props }) {
    return (
        <legend
            data-slot="field-legend"
            data-variant={variant}
            className={cn("field-legend", className)}
            {...props}
        />
    );
}

function FieldGroup({ className, ...props }) {
    return (
        <div
            data-slot="field-group"
            className={cn("field-group", className)}
            {...props}
        />
    );
}

function FieldContent({ className, ...props }) {
    return (
        <div
            data-slot="field-content"
            className={cn("field-content", className)}
            {...props}
        />
    );
}

function FieldLabel({ className, ...props }) {
    return (
        <label
            data-slot="field-label"
            className={cn("field-label", className)}
            {...props}
        />
    );
}

function FieldTitle({ className, ...props }) {
    return (
        <div
            data-slot="field-title"
            className={cn("field-title", className)}
            {...props}
        />
    );
}

function FieldDescription({ className, ...props }) {
    return (
        <p
            data-slot="field-description"
            className={cn("field-description", className)}
            {...props}
        />
    );
}

function FieldError({ className, children, errors, ...props }) {
    const messages = errors
        ? errors.map((error) =>
              typeof error === "string" ? error : error.message
          ).filter(Boolean)
        : [];

    const content = children || messages;

    if (!content || (Array.isArray(content) && content.length === 0)) {
        return null;
    }

    return (
        <div
            role="alert"
            data-slot="field-error"
            className={cn("field-error", className)}
            {...props}
        >
            {Array.isArray(content) ? (
                content.length === 1 ? (
                    content[0]
                ) : (
                    <ul>
                        {content.map((message, index) => (
                            <li key={index}>{message}</li>
                        ))}
                    </ul>
                )
            ) : (
                content
            )}
        </div>
    );
}

function FieldSeparator({ className, children, ...props }) {
    return (
        <div
            role="separator"
            data-slot="field-separator"
            className={cn("field-separator", className)}
            {...props}
        >
            {children && (
                <>
                    <span className="field-separator-line" />
                    <span className="field-separator-text">
                        {children}
                    </span>
                    <span className="field-separator-line" />
                </>
            )}
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
    FieldError,
    FieldSeparator,
};
