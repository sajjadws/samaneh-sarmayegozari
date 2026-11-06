
"use client"

import { useMemo } from "react"
import { cn } from "cn"

import { Label } from "../label/page"
// import { Separator } from "@/registry/bases/base/ui/separator"


// FieldSet - گروه‌بندی فیلدها
function FieldSet({ className, ...props }) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn("field-set", className)}
      {...props}
    />
  )
}


// FieldLegend - عنوان گروه فیلدها
function FieldLegend({
  className,
  variant = "legend",
  ...props
}) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn("field-legend", className)}
      {...props}
    />
  )
}


// FieldGroup - نگهدارنده گروهی از فیلدها
function FieldGroup({ className, ...props }) {
  return (
    <div
      data-slot="field-group"
      className={cn("field-group", className)}
      {...props}
    />
  )
}


// Field - نگهدارنده اصلی هر فیلد
function Field({
  className,
  orientation = "vertical",
  ...props
}) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn("field", className)}
      {...props}
    />
  )
}


// FieldContent - محتوای داخلی فیلد
function FieldContent({ className, ...props }) {
  return (
    <div
      data-slot="field-content"
      className={cn("field-content", className)}
      {...props}
    />
  )
}


// FieldLabel - برچسب فیلد
function FieldLabel({ className, ...props }) {
  return (
    <Label
      data-slot="field-label"
      className={cn("field-label", className)}
      {...props}
    />
  )
}


// FieldTitle - عنوان فیلد
function FieldTitle({ className, ...props }) {
  return (
    <div
      data-slot="field-label"
      className={cn("field-title", className)}
      {...props}
    />
  )
}


// FieldDescription - توضیحات فیلد
function FieldDescription({ className, ...props }) {
  return (
    <p
      data-slot="field-description"
      className={cn("field-description", className)}
      {...props}
    />
  )
}


// FieldSeparator - جداکننده فیلدها
function FieldSeparator({
  children,
  className,
  ...props
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn("field-separator", className)}
      {...props}
    >
      <Separator className="field-separator-line" />

      {children && (
        <span
          className="field-separator-content"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}


// FieldError - نمایش خطاهای فیلد
function FieldError({
  className,
  children,
  errors,
  ...props
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(
        errors.map((error) => [error?.message, error])
      ).values(),
    ]

    if (uniqueErrors.length === 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="field-error-list">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && (
              <li key={index}>{error.message}</li>
            )
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("field-error", className)}
      {...props}
    >
      {content}
    </div>
  )
}


export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
