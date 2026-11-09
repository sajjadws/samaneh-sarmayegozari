// "use client";

// import { Button } from "@/miz/themes/react/components/button/page";
// import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "@/miz/themes/react/components/field/page";
// import { Input } from "@/miz/themes/react/components/input/page";
// import { Controller, useForm } from "react-hook-form";

// export default function UserProfile() {
// 	const form = useForm({
// 		mode: "onChange",
// 	});

// 	function handleSubmit(values) {
// 		console.log(values);
// 	}

// 	return (
// 		<>
// 			<h2 className="txt-size-mid-title primary-color font-weight-bold">اطلاعات شخصی</h2>
// 			<form className="d-flex flex-column justify-content-center align-items-end gap-7" onSubmit={form.handleSubmit(handleSubmit)}>
// 				{/* <Controller name="email" control={form.control} defaultValue="email@domain.com" render={({ field, fieldState }) => <input type="email" {...field} />} /> */}
// 				<FieldGroup className="d-flex flex-column gap-4">
// 					<Controller
// 						name="fullName"
// 						control={form.control}
// 						render={({ field, fieldState }) => (
// 							<Field className="d-flex align-items-center gap-20" orientation="horizontal">
// 								<FieldLabel htmlFor="fullName">نام و نام خانوادگی:</FieldLabel>
// 								<Input id="fullName" className="max-w-70" placeholder="Evil Rabbit" required />
// 							</Field>
// 						)}
// 					/>
// 					<Controller
// 						name="phoneNumber"
// 						control={form.control}
// 						render={({ field, fieldState }) => (
// 							<Field className="d-flex align-items-center gap-20" orientation="horizontal">
// 								<FieldLabel htmlFor="phoneNumber">شماره موبایل:</FieldLabel>
// 								<Input id="phoneNumber" className="max-w-70" placeholder="Evil Rabbit" required />
// 							</Field>
// 						)}
// 					/>
// 					<Controller
// 						name="nationalCode"
// 						control={form.control}
// 						render={({ field, fieldState }) => (
// 							<Field className="d-flex align-items-center gap-20" orientation="horizontal">
// 								<FieldLabel htmlFor="nationalCode">کدملی:</FieldLabel>
// 								<Input id="nationalCode" className="max-w-70" placeholder="Evil Rabbit" required />
// 							</Field>
// 						)}
// 					/>
// 					<Controller
// 						name="password"
// 						control={form.control}
// 						render={({ field, fieldState }) => (
// 							<Field className="d-flex align-items-center gap-20" orientation="horizontal">
// 								<FieldLabel htmlFor="password">رمز عبور:</FieldLabel>
// 								<Input id="password" className="max-w-70" placeholder="Evil Rabbit" required />
// 							</Field>
// 						)}
// 					/>
//                     <div className="d-flex justify-content-space-between align-items-center">
//                         <span>وضعیت احراز هویت:</span>
//                         <span className="px-2 py-1 bg-success-regular-color white-color radius-all-full">تایید شده</span>
//                     </div>
// 				</FieldGroup>

// 				<Button type="submit">ویرایش اطلاعات</Button>
// 			</form>
// 		</>
// 	);
// }
