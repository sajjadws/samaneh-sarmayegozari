
"use client";

import { useState } from "react";

import { Input } from "@/miz/themes/react/components/input/page";
import { Textarea } from "@/miz/themes/react/components/textarea/page";
import { Button } from "@/miz/themes/react/components/button/page";

function NewTicketForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      return;
    }

    const newTicket = {
      id: crypto.randomUUID(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: "UNDER_REVIEW",
      createdAt: new Date(),
    };

    // فعلاً شبیه‌سازی ثبت تیکت
    console.log("New Ticket:", newTicket);

    setSubmitted(true);

    setFormData({
      title: "",
      description: "",
    });
  }

  return (
    <form className="new-ticket-form d-flex flex-column gap-8" onSubmit={handleSubmit}>
      <div className="new-ticket-field d-flex flex-column gap-4">
        <label htmlFor="ticket-title "
          className="txt-size-title primary-color font-weight-semi-bold"
        >عنوان تیکت</label>

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
        <label htmlFor="ticket-description "
          className="txt-size-title primary-color font-weight-semi-bold"
        >توضیحات</label>

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
        <Button type="submit" className="py-2 px-6">
          ارسال تیکت
        </Button>
      </div>

      {submitted && (
        <p className="new-ticket-success ">
          تیکت شما با موفقیت ثبت شد.
        </p>
      )}
    </form>
  );
}

export { NewTicketForm };
