
"use client"

import { useState } from "react"

import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/miz/themes/react/components/combobox/page"

export default function Page() {
  const [country, setCountry] = useState(null)

  return (
    <div className="p-8 space-y-4">

      <Combobox
        value={country}
        onValueChange={setCountry}
      >
        <ComboboxInput
          placeholder="انتخاب کشور..."
          showTrigger
          showClear
        />

        <ComboboxContent>
          <ComboboxEmpty>
            نتیجه‌ای پیدا نشد.
          </ComboboxEmpty>

          <ComboboxList>
            <ComboboxItem value="iran">
              ایران
            </ComboboxItem>

            <ComboboxItem value="germany">
              آلمان
            </ComboboxItem>

            <ComboboxItem value="france">
              فرانسه
            </ComboboxItem>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      <p>
        کشور انتخاب‌شده: {country || "هنوز انتخاب نشده"}
      </p>

    </div>
  )
}
