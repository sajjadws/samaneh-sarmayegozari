"use client";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import "react-multi-date-picker/styles/layouts/prime.css";

export default function PersianDatePicker({
  value,
  onChange,
  placeholder = "تاریخ را انتخاب کنید",
  disabled = false,
}) {
  return (
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

        // تبدیل تاریخ شمسی انتخاب‌شده به تاریخ میلادی
        const gregorianDate = date
          .convert("gregorian")
          .format("YYYY-MM-DD");

        // ارسال رشته تاریخ میلادی به فرم
        onChange?.(gregorianDate);
      }}
      inputClass="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
    />
  );
}