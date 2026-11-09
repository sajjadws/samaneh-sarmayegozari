"use client";

import { IconLoader } from "@tabler/icons-react";
import { Button } from "@/miz/themes/react/components/button/page";

export default function SubmitButton({ title, disabled, loading, type = "submit", form, ...props }) {
	return (
		<Button {...props} type={type} disabled={disabled} form={form}>
			<span>{title}</span>
			<span>{loading && <IconLoader className="animate-spin" />}</span>
		</Button>
	);
}
