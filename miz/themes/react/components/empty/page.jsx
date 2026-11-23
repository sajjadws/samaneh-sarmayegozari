
import * as React from "react";
import { cn } from "cn";

function Empty({ className, ...props }) {
    return (
        <div
            data-slot="empty"
            className={cn("empty", className)}
            {...props}
        />
    );
}

function EmptyHeader({ className, ...props }) {
    return (
        <div
            data-slot="empty-header"
            className={cn("empty-header", className)}
            {...props}
        />
    );
}

function EmptyMedia({ className, variant = "default", ...props }) {
    return (
        <div
            data-slot="empty-media"
            data-variant={variant}
            className={cn("empty-media", className)}
            {...props}
        />
    );
}

function EmptyTitle({ className, ...props }) {
    return (
        <h3
            data-slot="empty-title"
            className={cn("empty-title", className)}
            {...props}
        />
    );
}

function EmptyDescription({ className, ...props }) {
    return (
        <p
            data-slot="empty-description"
            className={cn("empty-description", className)}
            {...props}
        />
    );
}

function EmptyContent({ className, ...props }) {
    return (
        <div
            data-slot="empty-content"
            className={cn("empty-content", className)}
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
