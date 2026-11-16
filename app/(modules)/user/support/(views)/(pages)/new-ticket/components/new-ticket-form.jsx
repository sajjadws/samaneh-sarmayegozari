"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createTicket } from "@/app/(modules)/user/support/(views)/actions/support-actions";

import { Input } from "@/miz/themes/react/components/input/page";
import { Textarea } from "@/miz/themes/react/components/textarea/page";
import { Button } from "@/miz/themes/react/components/button/page";

function NewTicketForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSubmitted(false);
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    const title = formData.title.trim();
    const description = formData.description.trim();

    if (!title || !description) {
      setError("عنوان و توضیحات تیکت را وارد کنید.");
      return;
    }

    setLoading(true);
    setError("");
    setSubmitted(false);

    try {
      const result = await createTicket({
        title,
        description,
      });

      if (!result.success) {
        setError(result.message);
        return;
      }

      setSubmitted(true);
      setFormData({
        title: "",
        description: "",
      });

      // انتقال به صفحه جزئیات تیکت ثبت‌شده
      router.push(
        `/user/support/ticket-details/${result.ticket.id}`
      );
    } catch (error) {
      console.error("SUBMIT_TICKET_ERROR:", error);
      setError("ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="new-ticket-form d-flex flex-column gap-8"
      onSubmit={handleSubmit}
    >
      <div className="new-ticket-field d-flex flex-column gap-4">
        <label
          htmlFor="ticket-title"
          className="txt-size-title primary-color font-weight-semi-bold"
        >
          عنوان تیکت
        </label>

        <Input
          id="ticket-title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          maxLength={150}
          required
        />
      </div>

      <div className="new-ticket-field d-flex flex-column gap-4">
        <label
          htmlFor="ticket-description"
          className="txt-size-title primary-color font-weight-semi-bold"
        >
          توضیحات
        </label>

        <Textarea
          className="border-color radius-all-normal"
          id="ticket-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          maxLength={1000}
          required
        />
      </div>

      <div className="new-ticket-footer d-flex justify-content-end p-4">
        <Button
          type="submit"
          className="py-2 px-6"
          disabled={loading}
        >
          {loading ? "در حال ثبت..." : "ارسال تیکت"}
        </Button>
      </div>

      {error && (
        <p className="new-ticket-error" role="alert">
          {error}
        </p>
      )}

      {submitted && (
        <p className="new-ticket-success">
          تیکت شما با موفقیت ثبت شد.
        </p>
      )}
    </form>
  );
}

export { NewTicketForm };