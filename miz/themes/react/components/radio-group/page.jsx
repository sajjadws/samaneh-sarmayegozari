"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cn } from "cn"

function RadioGroup({ className, ...props }) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("radio-group", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-item"
      className={cn("radio-item", className)}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="radio-item-indicator"
      >
        <span className="radio-item-inner" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }



//-------------نحوه استفاده در صفحه -------------//
// "use client"

// import { useState } from "react"

// import {
//   RadioGroup,
//   RadioGroupItem
// } from "@/components/ui/radio-group"

// export default function PaymentForm() {
//   const [payment, setPayment] = useState("card")

//   return (
//     <div>
//       <h2>روش پرداخت</h2>

//       <RadioGroup
//         value={payment}
//         onValueChange={setPayment}
//       >
//         <label>
//           <RadioGroupItem value="card" />
//           کارت بانکی
//         </label>

//         <label>
//           <RadioGroupItem value="cash" />
//           پرداخت نقدی
//         </label>

//         <label>
//           <RadioGroupItem value="online" />
//           پرداخت آنلاین
//         </label>
//       </RadioGroup>

//       <p>روش انتخاب شده: {payment}</p>
//     </div>
//   )
// }