
"use client";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function PersianDatePicker({
  value,
  onChange,
  placeholder = "تاریخ را انتخاب کنید",
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <div className={`miz-date-picker ${className}`}>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        format="YYYY/MM/DD"
        value={value || ""}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(date) => {
          if (!date) {
            onChange?.("");
            return;
          }

          onChange?.(
            date.convert("gregorian").format("YYYY-MM-DD")
          );
        }}
        inputClass="miz-date-picker__input"
        containerClassName="miz-date-picker__container"
        {...props}
      />
    </div>
  );
}

export { PersianDatePicker as default, PersianDatePicker };