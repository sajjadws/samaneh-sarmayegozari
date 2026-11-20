"use client";

import { useRef } from "react";
import qs from "query-string";
import { Controller, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Field, FieldGroup } from "@/miz/themes/react/components/field/page";
import { Input } from "@/miz/themes/react/components/input/page";

export default function SearchTable({ q }) {
	const searchParams = useSearchParams();
	const form = useForm({
		defaultValues: { q },
	});
	const router = useRouter();

	const timerRef = useRef(null);

	async function handelOnChange(q) {
		clearTimeout(timerRef.current);

		timerRef.current = setTimeout(() => {
			pushQuery(q);
		}, 1500);
	}

	function pushQuery(q = null) {
		const current = qs.parse(searchParams.toString());
		const query = {
			...current,
			page: 1,
			q: q || null,
		};

		const url = qs.stringifyUrl(
			{
				url: window.location.href,
				query,
			},
			{
				skipNull: true,
			},
		);

		router.push(url);
	}

	return (
		<form id="form-rhf-input" className="w-100 max-w-20">
			<FieldGroup>
				<Controller
					name="q"
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<Input
								{...field}
								onChange={(e) => {
									field.onChange(e);
									handelOnChange(e.target.value);
								}}
								placeholder="جست و جو ..."
								className="max-w-96"
							/>
						</Field>
					)}
				/>
			</FieldGroup>
		</form>
	);
}
