
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createTicket } from "@/app/(modules)/user/support/(views)/actions/support-actions";

import { ticketSchema } from "@/lib/validation/ticket";

import { Input } from "@/miz/themes/react/components/input/page";
import { Textarea } from "@/miz/themes/react/components/textarea/page";
import { Button } from "@/miz/themes/react/components/button/page";

function NewTicketForm() {
  const router = useRouter();

  const [serverError, setServerError] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(ticketSchema),

    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values) {
    setServerError("");

    try {
      const result = await createTicket(values);

      if (!result?.success) {
        setServerError(
          result?.message || "ثبت تیکت انجام نشد. دوباره تلاش کنید."
        );
        return;
      }

      reset();

      router.push(
        `/user/support/ticket-details/${result.ticket.id}`
      );

    } catch (error) {
      console.error("SUBMIT_TICKET_ERROR:", error);

      setServerError(
        "ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید."
      );
    }
  }

  return (
    <form
      className="new-ticket-form d-flex flex-column gap-8 h-100"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {/* Ticket title */}
      <div className="new-ticket-field d-flex flex-column gap-4">
        <label
          htmlFor="ticket-title"
          className="txt-size-title primary-color font-weight-semi-bold"
        >
          عنوان تیکت
        </label>

        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="ticket-title"
              maxLength={150}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={
                errors.title ? "ticket-title-error" : undefined
              }
            />
          )}
        />

        {errors.title && (
          <p
            id="ticket-title-error"
            className="new-ticket-error highlight-text-color "
            role="alert"
          >
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Ticket description */}
      <div className="new-ticket-field d-flex flex-column gap-4">
        <label
          htmlFor="ticket-description"
          className="txt-size-title primary-color font-weight-semi-bold"
        >
          توضیحات
        </label>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              id="ticket-description"
              className="border-color radius-all-normal h-100"
              maxLength={1000}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description
                  ? "ticket-description-error"
                  : undefined
              }
            />
          )}
        />

        {errors.description && (
          <p
            id="ticket-description-error"
            className="new-ticket-error highlight-text-color"
            role="alert"
          >
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Form footer */}
      <div className="new-ticket-footer d-flex justify-content-end p-4">
        <Button
          type="submit"
          className="py-2 px-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? "در حال ثبت..." : "ارسال تیکت"}
        </Button>
      </div>

      {/* Server error */}
      {serverError && (
        <p className="new-ticket-error" role="alert">
          {serverError}
        </p>
      )}
    </form>
  );
}

export { NewTicketForm };
