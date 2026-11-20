import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/miz/themes/react/components/field/page";
import { Button } from "@/miz/themes/react/components/button/page";
import { Input } from "@/miz/themes/react/components/input/page";
import { toast } from "@/miz/themes/react/components/toast/page";
import { phoneNumberSchema } from "@/lib/validation/auth";
import { sendVerifyCode } from "../actions/authentication";
import SubmitButton from "./submit-button";
import { routes } from "@/lib/routes/routes";
import { useRouter } from "next/navigation";

export default function AccountInfo({ userData: { phoneNumber }, handleChangeStep }) {
    const form = useForm({
        resolver: zodResolver(phoneNumberSchema),
        defaultValues: {
            phoneNumber,
        },
        mode: "onChange",
    });

    const router = useRouter();

    async function onSubmit(values) {
        const res = await sendVerifyCode(values);

        if (res?.ok) {
            toast.add({
                title: res?.message,
            });
        }

        // handleChangeStep(2, res?.data);
        if(res?.ok){
			setTimeout(() => {
				// router.push("/");
				router.push(routes.user.profile);
				// router.push(routes.user.panel);
			}, 1000);
		}
    }

    return (
        <form className="w-100" id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-input-phoneNumber">نام</FieldLabel>
                            <Input {...field} id="form-rhf-input-phoneNumber" type="text" maxLength={13} aria-invalid={fieldState.invalid} placeholder="شماره تماس" dir="ltr" />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Button type="submit">test</Button>
            </FieldGroup>
        </form>
    );
}