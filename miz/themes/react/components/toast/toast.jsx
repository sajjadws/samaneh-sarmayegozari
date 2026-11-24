"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import {
  CircleCheck,
  Info,
  TriangleAlert,
  OctagonX,
  LoaderCircle,
  X,
} from "lucide-react";

const toastManager = ToastPrimitive.createToastManager();

const toast = {
  add(options = {}) {
    const { axis, ...rest } = options;

    return toastManager.add({
      ...rest,
      data: {
        ...rest.data,
        ...(axis ? { axis } : {}),
      },
    });
  },

  close(...args) {
    return toastManager.close(...args);
  },

  update(...args) {
    return toastManager.update(...args);
  },

  promise(...args) {
    return toastManager.promise(...args);
  },
};

function ToastProvider({ ...props }) {
  return <ToastPrimitive.Provider {...props} />;
}

function ToastPortal({ ...props }) {
  return (
    <ToastPrimitive.Portal
      data-slot="toast-portal"
      {...props}
    />
  );
}

function ToastViewport({ className, ...props }) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={utils.cn("toast-viewport", className)}
      {...props}
    />
  );
}

function Toast({ className, ...props }) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      className={utils.cn("toast", className)}
      {...props}
    />
  );
}

function ToastContent({ className, ...props }) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={utils.cn("toast-content", className)}
      {...props}
    />
  );
}

function ToastTitle({ className, ...props }) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={utils.cn("toast-title", className)}
      {...props}
    />
  );
}

function ToastDescription({ className, ...props }) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={utils.cn("toast-description", className)}
      {...props}
    />
  );
}

function ToastAction({ className, ...props }) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      className={utils.cn("toast-action", className)}
      {...props}
    />
  );
}

function ToastClose({ className, children, ...props }) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="Close notification"
      className={utils.cn("toast-close", className)}
      {...props}
    >
      {children || <X aria-hidden="true" />}
    </ToastPrimitive.Close>
  );
}

function ToastIcon({ type }) {
  const icons = {
    success: CircleCheck,
    info: Info,
    warning: TriangleAlert,
    error: OctagonX,
    loading: LoaderCircle,
  };

  const Icon = icons[type];

  if (!Icon) return null;

  return (
    <span data-slot="toast-icon" className="toast-icon">
      <Icon
        aria-hidden="true"
        className={type === "loading" ? "toast-icon-loading" : ""}
      />
    </span>
  );
}

function ToastList({ axis = "y" }) {
  const { toasts } = ToastPrimitive.useToastManager();

  return toasts.map((toastItem) => (
    <Toast
      key={toastItem.id}
      toast={toastItem}
      data-axis={toastItem.data?.axis || axis}
    >
      <ToastContent>
        <ToastIcon type={toastItem.type} />

        <div className="toast-body">
          <ToastTitle />
          <ToastDescription />
        </div>

        <ToastAction />
        <ToastClose />
      </ToastContent>
    </Toast>
  ));
}

function Toaster({
  children,
  axis = "y",
  className,
  ...props
}) {
  return (
    <ToastProvider
      toastManager={toastManager}
      {...props}
    >
      {children}

      <ToastPortal>
        <ToastViewport
          data-axis={axis}
          className={className}
        >
          <ToastList axis={axis} />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  );
}

const createToastManager = ToastPrimitive.createToastManager;
const useToastManager = ToastPrimitive.useToastManager;

export {
  Toaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastIcon,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  toast,
  useToastManager,
};