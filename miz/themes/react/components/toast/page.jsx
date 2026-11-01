"use client"

import * as React from "react"
import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import { cn } from "cn"

import { Button } from "../button/page"
// import { IconPlaceholder } from "@/app/(create)/components/icon-placeholder"

const toast = ToastPrimitive.createToastManager()

function ToastProvider({ ...props }) {
  return <ToastPrimitive.Provider {...props} />
}

function ToastPortal({ ...props }) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />
}

function ToastViewport({ className, ...props }) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cn(
        "toast-viewport",
        className
      )}
      {...props}
    />
  )
}

function Toast({ className, ...props }) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      className={cn(
        "toast-item ",
        className
      )}
      {...props}
    />
  )
}

function ToastContent({ className, ...props }) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cn(
        "toast-content",
        className
      )}
      {...props}
    />
  )
}

function ToastTitle({ className, ...props }) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn("toast-title", className)}
      {...props}
    />
  )
}

function ToastDescription({
  className,
  ...props
}) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn("toast-description", className)}
      {...props}
    />
  )
}

function ToastAction({
  className,
  render = <Button variant="outline" size="sm" />,
  ...props
}) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      render={render}
      className={cn("toast-action", className)}
      {...props}
    />
  )
}

function ToastClose({
  className,
  children,
  render = <Button variant="ghost" size="icon-sm" />,
  ...props
}) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="Close toast"
      render={render}
      className={cn(
        " toast-close",
        className
      )}
      {...props}
    >
      {children ?? (
        {/* <IconPlaceholder
          lucide="XIcon"
          tabler="IconX"
          hugeicons="Cancel01Icon"
          phosphor="XIcon"
          remixicon="RiCloseLine"
          aria-hidden="true"
        /> */}
      )}
    </ToastPrimitive.Close>
  )
}

function ToastIcon({ type }) {
  let icon = null

  if (type === "success") {
    // icon = (
    //   <IconPlaceholder
    //     lucide="CircleCheckIcon"
    //     tabler="IconCircleCheck"
    //     hugeicons="CheckmarkCircle02Icon"
    //     phosphor="CheckCircleIcon"
    //     remixicon="RiCheckboxCircleLine"
    //     aria-hidden="true"
    //   />
    // )
  }

  if (type === "info") {
    // icon = (
    //   <IconPlaceholder
    //     lucide="InfoIcon"
    //     tabler="IconInfoCircle"
    //     hugeicons="InformationCircleIcon"
    //     phosphor="InfoIcon"
    //     remixicon="RiInformationLine"
    //     aria-hidden="true"
    //   />
    // )
  }

  if (type === "warning") {
    // icon = (
    //   <IconPlaceholder
    //     lucide="TriangleAlertIcon"
    //     tabler="IconAlertTriangle"
    //     hugeicons="Alert02Icon"
    //     phosphor="WarningIcon"
    //     remixicon="RiErrorWarningLine"
    //     aria-hidden="true"
    //   />
    // )
  }

  if (type === "error") {
    // icon = (
    //   <IconPlaceholder
    //     lucide="OctagonXIcon"
    //     tabler="IconAlertOctagon"
    //     hugeicons="MultiplicationSignCircleIcon"
    //     phosphor="XCircleIcon"
    //     remixicon="RiCloseCircleLine"
    //     className="toast-icon-error"
    //     aria-hidden="true"
    //   />
    // )
  }

  if (type === "loading") {
    // icon = (
    //   <IconPlaceholder
    //     lucide="Loader2Icon"
    //     tabler="IconLoader"
    //     hugeicons="Loading03Icon"
    //     phosphor="SpinnerIcon"
    //     remixicon="RiLoaderLine"
    //     className="toast-loading-icon"
    //     aria-hidden="true"
    //   />
    // )
  }

  if (!icon) {
    return null
  }

  return (
    <span
      data-slot="toast-icon"
      className="toast-icon"
    >
      {icon}
    </span>
  )
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager()

  return toasts.map((toastItem) => (
    <Toast key={toastItem.id} toast={toastItem}>
      <ToastContent>
        <ToastIcon type={toastItem.type} />
        <div className="toast-text">
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastAction />
        <ToastClose />
      </ToastContent>
    </Toast>
  ))
}

function Toaster({
  children,
  toastManager = toast,
  ...props
}) {
  return (
    <ToastProvider toastManager={toastManager} {...props}>
      {children}
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

const createToastManager = ToastPrimitive.createToastManager
const useToastManager = ToastPrimitive.useToastManager

export {
  Toaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  toast,
  useToastManager,
}