
"use client";

import { useState } from "react";
import "./create-project-modal.css";

const steps = [
  "اطلاعات اصلی طرح",
  "اطلاعات مالی",
  "جزئیات سرمایه‌گذاری",
  "اسناد و تصاویر",
  "بازبینی و ثبت",
];

const initialData = {
  title: "",
  categoryId: "",
  durationDate: "",
  description: "",
  targetAmount: "",
  minInvestment: "",
  maxInvestment: "",
  expectedProfit: "",
  investmentDetails: "",
  image: null,
  documents: [],
};

export default function CreateProjectModal({
  open,
  onClose,
  onSubmit,
  categories = [],
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const updateField = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // اعتبارسنجی هر مرحله
  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 0) {
      if (!formData.title.trim()) {
        newErrors.title = "عنوان طرح الزامی است";
      }

      if (!formData.categoryId) {
        newErrors.categoryId = "دسته‌بندی را انتخاب کنید";
      }

      if (!formData.durationDate) {
        newErrors.durationDate = "مدت اجرا الزامی است";
      }

      if (!formData.description.trim()) {
        newErrors.description = "توضیحات الزامی است";
      }
    }

    if (currentStep === 1) {
      if (!formData.targetAmount) {
        newErrors.targetAmount = "مبلغ هدف الزامی است";
      }

      if (!formData.minInvestment) {
        newErrors.minInvestment = "حداقل سرمایه الزامی است";
      }

      if (!formData.maxInvestment) {
        newErrors.maxInvestment = "حداکثر سرمایه الزامی است";
      }
    }

    if (currentStep === 2) {
      if (!formData.expectedProfit) {
        newErrors.expectedProfit = "سود پیش‌بینی‌شده را وارد کنید";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;

    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === "documents") {
          value.forEach((file) => data.append("documents", file));
        } else if (value !== null) {
          data.append(key, value);
        }
      });

      await onSubmit(data);

      setFormData(initialData);
      setCurrentStep(0);
      onClose();
    } catch (error) {
      console.error("Create project error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (
    label,
    name,
    placeholder,
    type = "text"
  ) => (
    <div className="project-modal-field">
      <label>
        {label} <span>*</span>
      </label>

      <input
        type={type}
        value={formData[name]}
        placeholder={placeholder}
        onChange={(e) => updateField(name, e.target.value)}
      />

      {errors[name] && (
        <small className="project-modal-error">
          {errors[name]}
        </small>
      )}
    </div>
  );

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div
        className="project-modal"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="project-modal-header">
          <div>
            <h2>ایجاد طرح سرمایه‌گذاری جدید</h2>
            <p>اطلاعات طرح را در پنج مرحله تکمیل کنید</p>
          </div>

          <button
            className="project-modal-close"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>


        {/* Stepper */}
        <div className="project-modal-stepper">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`project-step ${
                index <= currentStep ? "active" : ""
              }`}
            >
              <div className="project-step-circle">
                {index < currentStep ? "✓" : index + 1}
              </div>

              <span>{step}</span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="project-modal-content">

          {/* Step 1 */}
          {currentStep === 0 && (
            <>
              <h3>اطلاعات اصلی طرح</h3>

              {renderField(
                "عنوان طرح",
                "title",
                "عنوان طرح را وارد کنید"
              )}

              <div className="project-modal-field">
                <label>دسته‌بندی طرح <span>*</span></label>

                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    updateField("categoryId", e.target.value)
                  }
                >
                  <option value="">انتخاب دسته‌بندی</option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>

                {errors.categoryId && (
                  <small className="project-modal-error">
                    {errors.categoryId}
                  </small>
                )}
              </div>

              {renderField(
                "مدت اجرای طرح (ماه)",
                "durationDate",
                "مثلاً ۱۲",
                "number"
              )}

              <div className="project-modal-field">
                <label>توضیحات طرح <span>*</span></label>

                <textarea
                  value={formData.description}
                  placeholder="شرح کامل طرح و اهداف آن را بنویسید"
                  onChange={(e) =>
                    updateField("description", e.target.value)
                  }
                />

                {errors.description && (
                  <small className="project-modal-error">
                    {errors.description}
                  </small>
                )}
              </div>
            </>
          )}

          {/* Step 2 */}
          {currentStep === 1 && (
            <>
              <h3>اطلاعات مالی</h3>

              {renderField(
                "مبلغ هدف سرمایه‌گذاری (تومان)",
                "targetAmount",
                "مبلغ مورد نیاز"
              )}

              {renderField(
                "حداقل مبلغ سرمایه‌گذاری (تومان)",
                "minInvestment",
                "حداقل مبلغ"
              )}

              {renderField(
                "حداکثر مبلغ سرمایه‌گذاری (تومان)",
                "maxInvestment",
                "حداکثر مبلغ"
              )}
            </>
          )}

          {/* Step 3 */}
          {currentStep === 2 && (
            <>
              <h3>جزئیات سرمایه‌گذاری</h3>

              {renderField(
                "سود پیش‌بینی‌شده (درصد)",
                "expectedProfit",
                "مثلاً ۲۰"
              )}

              <div className="project-modal-field">
                <label>شرایط و جزئیات سرمایه‌گذاری</label>

                <textarea
                  value={formData.investmentDetails}
                  placeholder="شرایط مشارکت و نحوه بازگشت سرمایه..."
                  onChange={(e) =>
                    updateField(
                      "investmentDetails",
                      e.target.value
                    )
                  }
                />
              </div>
            </>
          )}

          {/* Step 4 */}
          {currentStep === 3 && (
            <>
              <h3>اسناد و تصاویر</h3>

              <div className="project-modal-field">
                <label>تصویر اصلی طرح</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    updateField("image", e.target.files?.[0] || null)
                  }
                />
              </div>

              <div className="project-modal-field">
                <label>اسناد و مدارک طرح</label>

                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  onChange={(e) =>
                    updateField(
                      "documents",
                      Array.from(e.target.files || [])
                    )
                  }
                />
              </div>

              <p className="project-modal-hint">
                امکان انتخاب چند فایل برای اسناد طرح وجود دارد.
              </p>
            </>
          )}

          {/* Step 5 */}
          {currentStep === 4 && (
            <>
              <h3>بازبینی اطلاعات طرح</h3>

              <div className="project-review">
                {[
                  ["عنوان طرح", formData.title],
                  ["دسته‌بندی", categories.find(
                    (c) => String(c.id) === String(formData.categoryId)
                  )?.name || "-"],
                  ["مدت اجرا", formData.durationDate + " ماه"],
                  ["توضیحات", formData.description],
                  ["مبلغ هدف", formData.targetAmount + " تومان"],
                  ["حداقل سرمایه", formData.minInvestment + " تومان"],
                  ["حداکثر سرمایه", formData.maxInvestment + " تومان"],
                  ["سود پیش‌بینی‌شده", formData.expectedProfit + " درصد"],
                  ["تعداد اسناد", formData.documents.length],
                ].map(([label, value]) => (
                  <div className="project-review-item" key={label}>
                    <span>{label}</span>
                    <strong>{value || "-"}</strong>
                  </div>
                ))}
              </div>

              <p className="project-modal-hint">
                لطفاً اطلاعات را بررسی کنید. پس از ثبت، طرح برای
                بررسی و تأیید ارسال خواهد شد.
              </p>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="project-modal-footer">

          <button
            type="button"
            className="project-btn secondary"
            onClick={onClose}
          >
            انصراف
          </button>

          <span className="project-step-counter">
            مرحله {currentStep + 1} از ۵
          </span>

          {currentStep > 0 && (
            <button
              type="button"
              className="project-btn secondary"
              onClick={previousStep}
            >
              مرحله قبل
            </button>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              className="project-btn primary"
              onClick={nextStep}
            >
              مرحله بعد ←
            </button>
          ) : (
            <button
              type="button"
              className="project-btn primary"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "در حال ثبت..." : "ثبت نهایی طرح"}
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
