import * as React from "react";

function NativeSelect({
  className = "",
  size = "default",
  ...props
}) {
  return (
    <div
      className={`native-select-wrapper ${className}`}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className="native-select"
        {...props}
      />

      {/* آیکون فلش انتخاب */}
      <svg
        className="native-select-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

function NativeSelectOption({
  className = "",
  ...props
}) {
  return (
    <option
      data-slot="native-select-option"
      className={`native-select-option ${className}`}
      {...props}
    />
  );
}

function NativeSelectOptGroup({
  className = "",
  ...props
}) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={`native-select-optgroup ${className}`}
      {...props}
    />
  );
}

export {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
};