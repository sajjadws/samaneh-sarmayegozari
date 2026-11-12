"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/miz/components/react/field/page";
import { Input } from "@/miz/components/react/input/page";
import { toast } from "@/miz/components/react/toast/page";
import { postSchema } from "@/lib/validation/project";
import { createProject, editProject } from "../actions/crud";
import SubmitButton from "@/miz/components/react/submite-button/page";
// import CategoryCombobox from "./category-combox";
// import PersianDatePicker from "@/components/ui/persian-date-picker";

export default function CreateForm({ id, initialData, onComplete }) {
  const defaultValues = initialData ? { ...initialData } : { title: "", description: "", categoryId: "" };

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues,
    title: "",
    publishDate: "",
  });


  const {
    control,
    handleSubmit,
     register,
    formState: { isSubmitting },
  } = form;

 const onSubmit = async (values) => {
  console.log("مقادیر فرم:", values);
  console.log("شناسه دسته‌بندی:", values.categoryId);

  const res = initialData
    ? await editProject(id, values)
    : await createProject(values);

  console.log("نتیجه عملیات:", res);

  if (res?.ok) {
    toast.add({
      title: res.message,
    });

    onComplete();
  }
};

  return (
    <form id="form-rhf-input" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <label htmlFor="story-category">دسته‌بندی پست</label>
      </div>
      <FieldGroup>
        <Controller
          name="categoryId"
          control={form.control}
          render={({ field }) => <CategoryCombobox value={field.value} onChange={field.onChange} />}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium">
            تاریخ انتشار
          </label>

          <Controller
            name="publishDate"
            control={control}
            render={({ field }) => (
              <PersianDatePicker
                value={field.value}
                onChange={field.onChange}
                placeholder="تاریخ انتشار را انتخاب کنید"
              />
            )}
          />

          {errors.publishDate && (
            <p className="text-sm text-red-500">
              {errors.publishDate.message}
            </p>
          )}
        </div>

        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-input-title">عنوان</FieldLabel>
              <Input
                {...field}
                id="form-rhf-input-title"
                aria-invalid={fieldState.invalid}
                value={field.value ?? ""}
                placeholder="عنوان"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-input-description">اعتبار مورد نیاز</FieldLabel>
              <Input
                {...field}
                id="form-rhf-input-description"
                aria-invalid={fieldState.invalid}
                value={field.value ?? ""}
                placeholder="اعتبار مورد نیاز"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <SubmitButton
          title={initialData ? "ویرایش" : "افزودن"}
          loading={isSubmitting}
          disabled={isSubmitting}
          form="form-rhf-input"
        />
      </FieldGroup>
    </form>
  );
}
