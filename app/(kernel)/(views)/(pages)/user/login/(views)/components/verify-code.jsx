import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/miz/themes/react/components/field/page";
import { Input } from "@/miz/themes/react/components/input/page";
import { toast } from "@/miz/themes/react/components/toast/page";
import { verifyCodeSchema } from "@/lib/validation/auth";
import { checkVerifyCode } from "../actions/authentication";
import SubmitButton from "./submit-button";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes/routes";

export default function VerifyCode({ userData, handleChangeStep }) {
	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = useForm({
		resolver: zodResolver(verifyCodeSchema),
		defaultValues: {
			code: "",
		},
	});
	const router = useRouter();

	async function onSubmit(values) {
		const res = await checkVerifyCode({
			...values,
			token: userData.token,
			phoneNumber: userData.phoneNumber,
		});

		toast.add({
			title: res?.message,
		});

		if(res?.ok){
			setTimeout(() => {
				router.push("/");
				// router.push(routes.user.panel);
			}, 1000);
		}
	}

	return (
		<>
			<form className="w-100" id="form-rhf-input" onSubmit={handleSubmit(onSubmit)}>
				<FieldGroup>
					<Controller
						name="code"
						control={control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor="form-rhf-input-code">کد تایید را وارد کنید</FieldLabel>
								<Input {...field} id="form-rhf-input-code" dir="ltr" type="text" aria-invalid={fieldState.invalid} placeholder="* * * * *" maxLength={6} />
								{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
							</Field>
						)}
					/>
					<SubmitButton title={"تایید"} disabled={isSubmitting} loading={isSubmitting} form="form-rhf-input" />
					<SubmitButton
						title={"بازگشت و ویرایش شماره تماس"}
						disabled={isSubmitting}
						loading={isSubmitting}
						form="form-rhf-input"
						type="button"
						variant="outline"
						onClick={() => {
							handleChangeStep(1);
						}}
					/>
				</FieldGroup>
			</form>
		</>
	);
}
