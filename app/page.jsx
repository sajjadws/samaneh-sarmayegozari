"use client";
import "@/lib/globals-client";

import {Toaster, 
  toast,
} from "@/miz/themes/react/components/toast/page";

function ToastExample() {

  const showInfo = () => {
    toast.add({
      title: "New notification",
      description: "You have a new message.",
      type: "info",
      axis: "z",
    });
  };

  const showSuccess = () => {
    toast.add({
      title: "Changes saved",
      description: "Your changes have been saved.",
      type: "success",
      axis: "y",
    });
  };

  const showError = () => {
    toast.add({
      title: "Something went wrong",
      description: "Please try again.",
      type: "error",
    });
  };

  return (
    <>
      {/* Global Z axis */}
      <Toaster timeout={50000} limit={3} axis="z" />

      <button onClick={showInfo}>Z Axis</button>
      <button onClick={showSuccess}>Y Axis</button>
      <button onClick={showError}>Default Axis</button>
    </>
  );
}

export default ToastExample;