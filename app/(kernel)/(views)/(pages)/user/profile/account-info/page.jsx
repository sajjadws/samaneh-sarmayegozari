"use client";

import { Button } from "@/miz/themes/react/components/button/page";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "@/miz/themes/react/components/field/page";
import { Input } from "@/miz/themes/react/components/input/page";
import { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";

export default function UserProfile() {
	const form = useForm({
		mode: "onChange",
	});

	function handleSubmit(values) {
		console.log(values);
	}

	return (
		<>
			<h2 className="txt-size-mid-title primary-color font-weight-bold">اطلاعات حساب</h2>
            <div className="d-flex flex-column gap-12">
                <div className="d-flex justify-content-space-between align-items-center border-color bw-1 bb-style-solid p-1">
                    <span>تاریخ ثبت نام:</span>
                    <span>1405/01/01</span>
                </div>
                <div className="d-flex justify-content-space-between align-items-center border-color bw-1 bb-style-solid p-1">
                    <span>وضعیت حساب:</span>
                    <span className="px-2 py-1 bg-success-regular-color txt-size-small white-color radius-all-full">فعال</span>
                </div>
            </div>
		</>
	);
}
