// export default function BankInfoView() {
//     return (
//         <>
//             <h2 className="txt-size-mid-title primary-color font-weight-bold">
//                 اطلاعات بانکی
//             </h2>

//             <p className="secondary-text-color">
//                 اطلاعات بانکی برای این بخش در مدل‌های فعلیِ فایل ارسالی موجود نبود.
//                 پس از اتصال مدل اطلاعات بانکی، داده‌های واقعی کاربر در این قسمت نمایش داده می‌شوند.
//             </p>
//         </>
//     );
// }

"use client";

import { Button } from "@/miz/themes/react/components/button/page";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/miz/themes/react/components/field/page";
import { Input } from "@/miz/themes/react/components/input/page";
import { Controller, useForm } from "react-hook-form";
import { formatCardNumber } from "../validation/card-number";
import { formatSheba } from "../validation/shaba-number";

export default function UserProfile({ user }) {
	const form = useForm({
		mode: "onChange",
	});

	// function handleSubmit(values) {
	// 	console.log(values);
	// }

	return (
		<>
			<h2 className="txt-size-mid-title primary-color font-weight-bold">اطلاعات بانک</h2>
			<div className="d-flex flex-column gap-12 h-100">
				<div className="d-flex justify-content-space-between align-items-center border-color bw-1 bb-style-solid p-1">
					<span>نام بانک</span>
					<span>{user.wallet?.bankAccounts.bankName || "ثبت نشده"}</span>
				</div>
				<div className="d-flex justify-content-space-between align-items-center border-color bw-1 bb-style-solid p-1">
					<span>شماره حساب</span>
					<span className="ltr">{formatCardNumber(user.wallet?.bankAccounts.numberCard) || "ثبت نشده"}</span>
					{/* <span>6219 **** **** 4933</span> */}
				</div>
				<div className="d-flex justify-content-space-between align-items-center border-color bw-1 bb-style-solid p-1">
					<span>شماره شبا</span>
					<span className="ltr">{formatCardNumber(user.wallet?.bankAccounts.numberShaba) || "ثبت نشده"}</span>
				</div>
			</div>
			<Button className="align-self-end py-2 px-4" type="submit">
				ویرایش حساب بانکی
			</Button>
		</>
	);
}
