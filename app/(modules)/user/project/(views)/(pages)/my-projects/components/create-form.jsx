
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/miz/components/react/field/page";

import { Input } from "@/miz/components/react/input/page";
import { toast } from "@/miz/components/react/toast/page";

import { postSchema } from "@/lib/validation/project";
import { createProject, editProject } from "../actions/crud";

import SubmitButton from "@/miz/components/react/submite-button/page";

export default function CreateForm({ id, initialData, onComplete }) {
  const form = useForm({
    resolver: zodResolver(postSchema),

    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      durationDate: initialData?.durationDate ?? "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  // const onSubmit = async (values) => {
  //   try {
  //     console.log("مقادیر فرم:", values);

  //     const res = initialData
  //       ? await editProject(id, values)
  //       : await createProject(values);

  //     console.log("نتیجه عملیات:", res);

  //     if (!res?.ok) {
  //       toast.add({
  //         title: res?.message || "عملیات با خطا مواجه شد.",
  //       });
  //       return;
  //     }

  //     toast.add({
  //       title: res.message || "پروژه با موفقیت ثبت شد.",
  //     });

  //     onComplete?.();
  //   } catch (error) {
  //     console.error("Project submit error:", error);

  //     toast.add({
  //       title: "خطا در ثبت اطلاعات پروژه",
  //     });
  //   }
  // };

  const onSubmit = async (values) => {
  console.log("1. فرم Submit شد");
  console.log("2. مقادیر فرم:", values);

  try {
    console.log("3. در حال اجرای createProject");

    const res = initialData
      ? await editProject(id, values)
      : await createProject(values);

    console.log("4. نتیجه Server Action:", res);

    if (!res?.ok) {
      toast.add({
        title: res?.message || "عملیات با خطا مواجه شد.",
      });
      return;
    }

    toast.add({
      title: res.message || "پروژه با موفقیت ثبت شد.",
    });

    onComplete?.();

  } catch (error) {
    console.error("Project submit error:", error);

    toast.add({
      title: error?.message || "خطا در ثبت اطلاعات پروژه",
    });
  }
};

  return (
    <div className="px-6 py-8 bg-color radius-all-normal">
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          {initialData
            ? "ویرایش طرح سرمایه گذاری"
            : "ایجاد طرح سرمایه گذاری جدید"}
        </h2>

        <p className="mt-2 text-sm">
          اطلاعات کلی طرح سرمایه گذاری خود را وارد کنید.
        </p>
      </div>

      <form
        id="form-rhf-input"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FieldGroup>

          {/* عنوان طرح */}
          <Field>
            <FieldLabel>عنوان طرح</FieldLabel>

            <Input
              {...register("title")}
              placeholder="عنوان طرح را وارد کنید"
            />

            {errors.title && (
              <FieldError>
                {errors.title.message}
              </FieldError>
            )}
          </Field>

          {/* توضیحات */}
          <Field>
            <FieldLabel>توضیحات کامل</FieldLabel>

            <textarea
              {...register("description")}
              placeholder="توضیحات طرح را وارد کنید"
              rows={5}
              className="w-full rounded-md border p-3"
            />

            {errors.description && (
              <FieldError>
                {errors.description.message}
              </FieldError>
            )}
          </Field>

          {/* مدت زمان اجرا */}
          <Field>
            <FieldLabel>
              مدت زمان اجرای طرح (ماه)
            </FieldLabel>

            <Input
              {...register("durationDate")}
              type="number"
              min="1"
              max="600"
              step="1"
              placeholder="مثلاً 18"
            />

            {errors.durationDate && (
              <FieldError>
                {errors.durationDate.message}
              </FieldError>
            )}
          </Field>

          {/* دکمه ثبت */}
          <SubmitButton
            title={initialData ? "ویرایش" : "افزودن"}
            loading={isSubmitting}
            disabled={isSubmitting}
            form="form-rhf-input"
          />

        </FieldGroup>
      </form>
    </div>
  );
}
